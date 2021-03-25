/**
 * Created by Navit on 15/11/16.
 */
 "use strict";

 var Models = require("../models");
 
 var updateSceneObjects = function(criteria, dataToSet, options, callback) {
   options.lean = true;
   options.new = true;
   Models.SceneObject.findOneAndUpdate(criteria, dataToSet, options, callback);
 };
 //Insert User in DB
 var createSceneObjects = function(objToSave, callback) {
   new Models.SceneObject(objToSave).save(callback);
 };
 //Delete User in DB
 var deleteSceneObjects = function(criteria, callback) {
   Models.SceneObject.findOneAndRemove(criteria, callback);
 };
 
 //Get Users from DB
 var getSceneObjects = function(criteria, projection, options, callback) {
   options.lean = true;
   Models.SceneObject.find(criteria, projection, options, callback);
 };
 
 var getPopulatedSceneObjects = function (criteria, projection, populate, sortOptions, setOptions, callback) {
   Models.SceneObject.find(criteria).select(projection).populate(populate).sort(sortOptions).setOptions(setOptions).exec(function(err, result){
       callback(err, result);
   });
 };
 
 module.exports = {
   updateSceneObjects: updateSceneObjects,
   createSceneObjects: createSceneObjects,
   deleteSceneObjects: deleteSceneObjects,
   getSceneObjects: getSceneObjects,
   getPopulatedSceneObjects: getPopulatedSceneObjects
 };
 