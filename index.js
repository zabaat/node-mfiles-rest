"use strict";
let _ = require("lodash")
let mfiles = require("./lib/rest.js").clientSetup()


mfiles("http://192.168.1.4","Imagilux");
mfiles.genAuthToken("serviceAccount","tunacakes")
//TODO set vault token via  
// 

module.exports = {


}