/**
 * Created by Navit on 15/11/16.
 */
"use strict";

var Models = require("../models");

var updateUserAvatar = function(criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.UserAvatar.findOneAndUpdate(criteria, dataToSet, options, callback);
};
//Insert User in DB
var createUserAvatar = function(objToSave, callback) {
  new Models.UserAvatar(objToSave).save(callback);
};
//Delete User in DB
var deleteUserAvatar = function(criteria, callback) {
  Models.UserAvatar.findOneAndRemove(criteria, callback);
};

//Get Users from DB
var getUserAvatar = function(criteria, projection, options, callback) {
  options.lean = true;
  Models.UserAvatar.find(criteria, projection, options, callback);
};

var getPopulatedUserAvatar = function (criteria, projection, populate, sortOptions, setOptions, callback) {
  Models.UserAvatar.find(criteria).select(projection).populate(populate).sort(sortOptions).setOptions(setOptions).exec(function(err, result){
      callback(err, result);
  });
};

module.exports = {
  updateUserAvatar: updateUserAvatar,
  createUserAvatar: createUserAvatar,
  deleteUserAvatar: deleteUserAvatar,
  getUserAvatar: getUserAvatar,
  getPopulatedUserAvatar: getPopulatedUserAvatar
};
