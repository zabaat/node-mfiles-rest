"use strict";
// helpful reference https://github.com/jplumhoff/MFilesREST/blob/master/src/main/groovy/com/plasmatherm/MFilesREST/MFilesREST.groovy
let request = require("request")
request.debug = true
let _ = require("lodash") //qq
function errorHandler(err) {
    throw new Error(err)
}

function clientSetup() {
    let _init = true //controls inital state check
    let _defaultsObj = {
        baseUrl: "http://127.0.0.1/REST/",
        timeout: 10000,
        headers : {"X-Authentication":""}
    }
    let _authToken = "" //used only to get the vault token
    let _vaultTokens = {}
    let _vaultName = ""
    let _req = ""

    function checkToken() {
        if (_init)
            return true //it's ok we are still setup!
        if (_vaultName === "")
            return false
        if (_.isUndefined(_vaultTokens[_vaultName]))
            return false
        return true
    }

    ///// MAIN REST FUNCTIONS
    function sendGet(pathString, query, contentType, cb) {

        if (!checkToken())
            return "invalid token"
        //TODO add query string
        if(typeof query === "function")
            cb = query
        if(typeof cb !== "function")
            return errorHandler("sendGet requires function CB")
        _req.get(pathString, (e,b,res)=>{
            if(e)
                return cb(e,b,res)
            if(typeof res === "string"){
                try{
                    let temp = JSON.parse(res)
                    return cb(e,b,temp)
                }catch(emAll){
                    return cb(e,b,res)
                }
            }
            return cb(e,b,res)
        })
    }

    function sendPost(pathString, data, cb) {
        let dataObj = {
            json:data
        }
        if (!checkToken())
            return errorHandler("you must have vaultToken set")
        // if (_.isUndefined(contentType))
        //     contentType = "application/json"

        if(typeof data === "function"){
            cb = data
            dataObj = undefined
        }
        if(typeof cb !== "function")
            return errorHandler("sendPost requires function CB")
        _req.post(pathString, dataObj, (e,b,res)=>{
            if(e)
                return cb(e,b,res)
            if(typeof res === "string"){
                try{
                    let temp = JSON.parse(res)
                    return cb(e,b,temp)
                }catch(emAll){
                    return cb(e,b,res)
                }
            }
            return cb(e,b,res)
        })
    }

    ///// END MAIN REST FUNCTIONS

    //// client function
    function client(serverAddress, vaultName) {
        if (typeof serverAddress !== "string")
            return errorHandler("serverAddress must be string")
        if (serverAddress.indexOf("http://") !== 0)
            return errorHandler("malformed address, must start with http://")

        _defaultsObj.baseUrl = serverAddress + "/REST/"
        _req = request.defaults(_defaultsObj)
    }

    ////// SETUP FUNCTIONS
    client.setupGenAuthToken = (username, password,vaultName,cb) => {
        function setupDoVaultToken(vaultName){
            if (typeof vaultName === "string")
                _vaultName = vaultName
            else {
                return errorHandler("you need to specify a vaultName")
            }
            sendGet("/server/vaults", (err, x, res) => {
                if(err)
                    return errorHandler(err)
                let vault = _.find(res,v=>v.Name === _vaultName)
                if(!_.has(vault,"Authentication"))
                    return errorHandler("Response from server was invalid for vault token setup")
                _init = false //we are okay state!
                _vaultTokens[_vaultName] = _vaultTokens[_vaultName] || {}
                _vaultTokens[_vaultName].token = vault["Authentication"]
                _vaultTokens[_vaultName].guid = vault["GUID"]
                _defaultsObj.headers["X-Authentication"] = vault["Authentication"]
                _req = _req.defaults(_defaultsObj)
                if(typeof cb === "function")
                    return cb()
            })
            return client
        }

        sendPost("/server/authenticationtokens", {
            username: username,
            password: password
        }, (err, x, res) => {
            if (err)
                return errorHandler(err)
            _authToken = res.Value
            _defaultsObj.headers["X-Authentication"] = _authToken 
            _req = _req.defaults(_defaultsObj)
            setupDoVaultToken(vaultName)
        })
        return client
    }

    client.setupSetVaultAuthToken = (token,vaultName) => { //if you have stored a token already you can just pass it in here!
        _init = false
        _vaultTokens[_vaultName] = _vaultTokens[_vaultName] || {}
        _vaultTokens[_vaultName].token = token
        _defaultsObj.headers["X-Authentication"] = vault["Authentication"]
        _req = _req.defaults(_defaultsObj)
        return client
    }
    ///// END SETUP FUNCTIONS

    client.getRootViews = function(cb){
        sendGet("views/items",(e,r,res)=>{
            return cb(e,res)
        })
    }
    client.getObjects= function(mfTypeId){
        return new Promise((resolve,reject)=>{
            sendGet('objects/' + mfTypeId || "",(e,b,res)=>{
                if(e)
                    return reject(e)
                return resolve(res)
            })
        }) 
        
    }

    client.create = function(type,data){
        let payload = {}
        return new Promise((resolve,reject)=>{
            if(type === "customer"){
                payload["PropertyValues"] = [{
                    // Document name
                    PropertyDef: 0,
                    TypedValue: { DataType: 1, Value: "Invoice" }
                }, {
                    // "Single File" property
                    PropertyDef: 22,
                    TypedValue: { DataType: 8, Value: false }
                }, {
                    // Class.
                    PropertyDef: 100,
                    TypedValue: { DataType: 9, Lookup: { Item: 0 } }
                }]
            }else if (type === "document"){
                payload["PropertyValues"] = [{
                    // Document name
                    PropertyDef: 0,
                    TypedValue: { DataType: 1, Value: "Invoice" }
                }, {
                    // "Single File" property
                    PropertyDef: 22,
                    TypedValue: { DataType: 8, Value: false }
                }, {
                    // Class.
                    PropertyDef: 100,
                    TypedValue: { DataType: 9, Lookup: { Item: 0 } }
                }]

            }else{
                return reject("type not specified")
            }

            sendPost("objects/0.aspx",payload,(e,b,res)=>{
                console.log(e)
                console.log(b)
                console.log(res)
            })
        })
        
    }
    

    return client
}

module.exports = {
    clientSetup: clientSetup,

}











/*
Response from document 

*/