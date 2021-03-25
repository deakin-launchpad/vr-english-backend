/**
 * Created by Navit on 15/11/16.
 */

 /**
 * Please use appLogger for logging in this file try to abstain from console
 * levels of logging:
 * - TRACE - ‘blue’
 * - DEBUG - ‘cyan’
 * - INFO - ‘green’
 * - WARN - ‘yellow’
 * - ERROR - ‘red’
 * - FATAL - ‘magenta’
 */

  var Service = require("../../services");
  var UniversalFunctions = require("../../utils/universalFunctions");
  var async = require("async");
  // var UploadManager = require('../../lib/uploadManager');
  var TokenManager = require("../../lib/tokenManager");
  var CodeGenerator = require("../../lib/codeGenerator");
  var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
  var _ = require("underscore");

  var createScene = function(userData,payloadData,callback){
    var sceneData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            Service.SceneService.createScenes(payloadData,function(err,data){
                if(err) cb(err)
                else {
                    sceneData = data
                    cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { sceneData:sceneData })
        })
  }

var createGameObjects = function(userData,payloadData,callback){
    var gameObjectData;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            Service.GameObjectService.createGameObjects(payloadData,function(err,data){
                if(err) cb(err)
                else {
                    gameObjectData = data
                    cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { gameObjectData:gameObjectData })
        })
  }

  var addGameObjectsToScene = function(userData,payloadData,callback){
    var sceneObjectData = null;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            var criteria = {
                _id: payloadData.sceneId
            }

            Service.SceneService.getScenes(criteria,{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length != 0) cb()
                    else cb(ERROR.SCENE_NOT_FOUND)
                }
            })
        },
        function(cb){
            var criteria = {
                sceneId: payloadData.sceneId
            }
            Service.SceneObjectService.getSceneObjects(criteria,{},{},function(err,data){
                if(err) cb(err)
                else{
                    if(data.length != 0) {
                        sceneObjectData = data && data[0]
                        cb()
                    }
                    else {
                        var dataToSave = {
                            sceneId: payloadData.sceneId
                        }
                        Service.SceneObjectService.createSceneObjects(dataToSave,function(err,data){
                            if(err) cb(err)
                            else {
                                sceneObjectData = data;
                                cb()
                            }
                        })
                    }
                }
            })
        },
        function(cb) {
            if(sceneObjectData != null){
                var taskInParallel = [];
            for (var key in payloadData.connectedObjects) {
              (function (key) {
                taskInParallel.push((function (key) {
                  return function (embeddedCB) {
                    //TODO
                    addObjectsToScene(sceneObjectData,payloadData.connectedObjects[key],function(err,data){
                        embeddedCB()
                    })
                  }
                })(key))
              }(key));
            }
            async.parallel(taskInParallel, function (err, result) {
              cb(null);
            });
            }
            else cb()
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { })
        })
  }

  var addObjectsToScene = function(sceneObjectData,connectedObjectData,callback){
      var objectExist = false;
    async.series([
        function(cb) {
            var criteria = {
                _id: connectedObjectData.gameObjectId
            }
            Service.GameObjectService.getGameObjects(criteria,{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length != 0) {
                        objectExist = true
                        cb()
                    }
                    else cb()
                }
            })
        },
        function(cb) {
            if(objectExist) {
                var criteria = {
                    _id: sceneObjectData._id
                }
                var dataToUpdate = {
                    $addToSet: {
                        connectedObjects: connectedObjectData
                    }
                }
                Service.SceneObjectService.updateSceneObjects(criteria,dataToUpdate,{},function(err,data){
                    if(err) cb(err)
                    else cb()
                })
            }
            else cb()
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null)
        })
  }

  var getAllScenes = function(userData,callback) {
    var sceneData = [] ;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            Service.SceneService.getScenes({},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length != 0) {
                        sceneData = data;
                        cb()
                    }
                    else cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { sceneData:sceneData })
        })
  }

  var getAllGameObjects = function(userData,callback) {
    var gameObjectData = [] ;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            Service.GameObjectService.getGameObjects({},{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length != 0) {
                        gameObjectData = data;
                        cb()
                    }
                    else cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { gameObjectData:gameObjectData })
        })
  }

  var getSceneObjects = function(userData,payloadData, callback) {
    var sceneData = [] ;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.AdminService.getAdmin(criteria, {}, {}, function (
                err,
                data
            ) {
                if (err) cb(err);
                else {
                    if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
                    else cb()
                }
            });
        },
        function(cb) {
            var criteria = {
                _id: payloadData.sceneId
            }

            Service.SceneService.getScenes(criteria,{},{},function(err,data){
                if(err) cb(err)
                else {
                    if(data.length != 0) cb()
                    else cb(ERROR.SCENE_NOT_FOUND)
                }
            })
        },
        function (cb) {
            var criteria = {
                sceneId: payloadData.sceneId
            }
            let path = 'name description locationX locationY locationZ';
            var select = 'sceneId';
            let populate = {
                path: path,
                match: {},
                select: select,
                options: { lean: true }
            };
            let projection = {
                __v: 0,
                createdAt: 0,
                updatedAt: 0
            };
            Service.SceneObjectService.getPopulatedSceneObjects(criteria,projection,populate,{},{},function(err,data){
                if(err) cb(err)
                else {
                    sceneData = data;
                    cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { sceneData:sceneData })
        })
  }

  module.exports = {
    createScene: createScene,
    createGameObjects: createGameObjects,
    addGameObjectsToScene: addGameObjectsToScene,
    getAllScenes:getAllScenes,
    getAllGameObjects: getAllGameObjects,
    getSceneObjects: getSceneObjects
  };
  