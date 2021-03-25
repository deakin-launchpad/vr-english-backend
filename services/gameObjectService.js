/**
 * Created by Navit on 15/11/16.
 */
 "use strict";

 var Models = require("../models");
 
 var updateGameObjects = function(criteria, dataToSet, options, callback) {
   options.lean = true;
   options.new = true;
   Models.GameObject.findOneAndUpdate(criteria, dataToSet, options, callback);
 };
 //Insert User in DB
 var createGameObjects = function(objToSave, callback) {
   new Models.GameObject(objToSave).save(callback);
 };
 //Delete User in DB
 var deleteGameObjects = function(criteria, callback) {
   Models.GameObject.findOneAndRemove(criteria, callback);
 };
 
 //Get Users from DB
 var getGameObjects = function(criteria, projection, options, callback) {
   options.lean = true;
   Models.GameObject.find(criteria, projection, options, callback);
 };
 
 var getPopulatedGameObjects = function (criteria, projection, populate, sortOptions, setOptions, callback) {
   Models.GameObject.find(criteria).select(projection).populate(populate).sort(sortOptions).setOptions(setOptions).exec(function(err, result){
       callback(err, result);
   });
 };
 
 module.exports = {
   updateGameObjects: updateGameObjects,
   createGameObjects: createGameObjects,
   deleteGameObjects: deleteGameObjects,
   getGameObjects: getGameObjects,
   getPopulatedGameObjects: getPopulatedGameObjects
 };
 