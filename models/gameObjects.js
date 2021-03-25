/**
 * Created by Navit on 15/11/16.
 */
 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;
 var Config = require("../config");
 
 var gameobject = new Schema({
     name: { type: String, trim: true, required: true },
     height: { type: Number}
 });
 
 module.exports = mongoose.model("gameobject", gameobject);
 