"use strict";
let _ = require("lodash")
let mfiles = require("./lib/rest.js").clientSetup()


mfiles("http://192.168.1.4");
mfiles.setupGenAuthToken("serviceAccount","tunacakes","Imagilux",()=>{
    console.log("I finished! love me!")
    mfiles.getRootViews((err,data)=>{
        if(err)
            return console.log("ERR getting root views",err)
        console.log("DATA!",data)
        // mfiles.create("document")
        mfiles.getObjects(1).then(res=>{
            console.log("your res",res)
        })
    })
})
//TODO set vault token via  
// 

module.exports = {

}



















