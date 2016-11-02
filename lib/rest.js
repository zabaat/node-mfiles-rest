"use strict";
// helpful reference https://github.com/jplumhoff/MFilesREST/blob/master/src/main/groovy/com/plasmatherm/MFilesREST/MFilesREST.groovy
let request = require("request")
let _ = require("lodash") //qq
function errorHandler(err){
    throw new Error(err)
}

function clientSetup(){
    let _defaultsObj = {baseUrl:"http://127.0.0.1/REST/",timeout:2000}
    let _authToken = "" //used only to get the vault token
    let _vaultTokens = {}
    
    let _vaultName = ""
    let _req = ""
    
    function defaultCb(err,message,responseBody){
        if(err)
            console.log("Error:",err)
        else
            console.log(responseBody)
    }

    function sendGet(pathString,query,contentType){
        if(_vaultToken === "")
            return errorHandler("you must have vaultToken set")
        
        if(_.isUndefined(contentType))
            contentType = "application/json"
        
    }

    function sendPost(pathString,data,cb){
        if(_vaultToken === "" && pathString !== "/server/authenticationtokens")
            return errorHandler("you must have vaultToken set")
        console.log(typeof _req)
        _req.post(pathString,{json:data},cb)

    }


    function client(serverAddress,vaultName){
        if(typeof serverAddress !== "string")
            return errorHandler("serverAddress must be string")
        if(serverAddress.indexOf("http://")!== 0)
            return errorHandler("malformed address, must start with http://")
        _defaultsObj.baseUrl = serverAddress+"/REST/"
        request = request.defaults(_defaultsObj)
        _req = request
    }
    
    client.genAuthToken = (username,password)=>{
        sendPost("/server/authenticationtokens",{username:username,password:password},(err,x,res)=>{
            if(err)
                return errorHandler(err)
            _authToken = res.Value
            console.log(_authToken)
        })
        return client
    }

    client.setAuthToken=(token)=>{
        return client
    }

    return client
}

module.exports={
    clientSetup:clientSetup,

}