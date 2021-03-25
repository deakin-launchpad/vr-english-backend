/**
 * Created by Navit on 15/11/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Config = require("../config");

var scene = new Schema({
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true},
    locationX: {
        startX: { type: Number },
        endX: { type: Number }
    },
    locationY: {
        startY: { type: Number },
        endY: { type: Number }
    },
    locationZ: {
        startZ: { type: Number },
        endZ: { type: Number }
    },
    isActive: { type: Boolean, required: true, default: true}
});

module.exports = mongoose.model("scene", scene);
