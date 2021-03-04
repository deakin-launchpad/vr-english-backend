/**
 * Created by Navit on 15/11/16.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Config = require("../config");

var userAvatar = new Schema({
  userId: { type: Schema.ObjectId, ref: 'user', required: true  },
  gender: { type: String, required: true , enum: [
      Config.APP_CONSTANTS.DATABASE.USER_GENDER.MALE,
      Config.APP_CONSTANTS.DATABASE.USER_GENDER.FEMALE
  ], default: Config.APP_CONSTANTS.DATABASE.USER_GENDER.MALE},
  shirtColor: { type: String, required: true},
  shoeColor: {type: String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("userAvatar", userAvatar);
