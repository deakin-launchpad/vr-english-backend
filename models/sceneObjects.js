/**
 * Created by Navit on 15/11/16.
 */
 var mongoose = require("mongoose");
 var Schema = mongoose.Schema;
 var Config = require("../config");
 
 var sceneobject = new Schema({
     sceneId: { type: Schema.ObjectId, ref: 'scene', required: true  },
     connectedObjects: [{
         gameObjectId: { type: Schema.ObjectId, ref: 'gameobject', required: true  },
         locationX: { type: Number, required: true },
         locationY: { type: Number, required: true },
         locationZ: { type: Number, required: true },
         isActive: {type: Boolean, required: true, default: true}
     }]
 });
 
 module.exports = mongoose.model("sceneobject", sceneobject);
 