/**
 * Created by Navit on 15/11/16.
 */
 "use strict";

 var Models = require("../models");
 
 var updateScenes = function(criteria, dataToSet, options, callback) {
   options.lean = true;
   options.new = true;
   Models.Scene.findOneAndUpdate(criteria, dataToSet, options, callback);
 };
 //Insert User in DB
 var createScenes = function(objToSave, callback) {
   new Models.Scene(objToSave).save(callback);
 };
 //Delete User in DB
 var deleteScenes = function(criteria, callback) {
   Models.Scene.findOneAndRemove(criteria, callback);
 };
 
 //Get Users from DB
 var getScenes = function(criteria, projection, options, callback) {
   options.lean = true;
   Models.Scene.find(criteria, projection, options, callback);
 };
 
 var getPopulatedScenes = function (criteria, projection, populate, sortOptions, setOptions, callback) {
   Models.Scene.find(criteria).select(projection).populate(populate).sort(sortOptions).setOptions(setOptions).exec(function(err, result){
       callback(err, result);
   });
 };
 
 module.exports = {
   updateScenes: updateScenes,
   createScenes: createScenes,
   deleteScenes: deleteScenes,
   getScenes: getScenes,
   getPopulatedScenes: getPopulatedScenes
 };
 