/**
 * Created by Navit on 15/11/16.
 */
 var UniversalFunctions = require("../../utils/universalFunctions");
 var Controller = require("../../controllers");
 var Joi = require("joi");
 var Config = require("../../config");

 var createScene = {
    method: "POST",
    path: "/api/scene/createScene",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.SceneController.createScene(userData, payloadData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "create a scene",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        payload: {
            name: Joi.string().required(),
            description: Joi.string().required(),
            locationX: Joi.object().keys({
                startX: Joi.number().required(),
                endX: Joi.number().required()
            }),
            locationY: Joi.object().keys({
                startY: Joi.number().required(),
                endY: Joi.number().required()
            }),
            locationZ: Joi.object().keys({
                startZ: Joi.number().required(),
                endZ: Joi.number().required()
            })
        },
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  };


  var createGameObjects = {
    method: "POST",
    path: "/api/scene/createGameObjects",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.SceneController.createGameObjects(userData, payloadData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "create a game Object",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        payload: {
            name: Joi.string().required(),
            height: Joi.number().required()
        },
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  };

  var addGameObjectsToScene = {
    method: "POST",
    path: "/api/scene/addGameObjectsToScene",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.SceneController.addGameObjectsToScene(userData, payloadData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "add game objects to scene",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        payload: {
            sceneId: Joi.string().required(),
            connectedObjects: Joi.array().items(
                Joi.object().keys({
                    gameObjectId: Joi.string().required(),
                    locationX: Joi.number().required(),
                    locationY: Joi.number().required(),
                    locationZ: Joi.number().required()
                })
            )
        },
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  };

  var getAllScenes = {
    method: "GET",
    path: "/api/scene/getAllScenes",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.SceneController.getAllScenes(userData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "get all scenes",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  }

  var getAllGameObjects = {
    method: "GET",
    path: "/api/scene/getAllGameObjects",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.SceneController.getAllGameObjects(userData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "get all scenes",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  }

  var getSceneObjects = {
    method: "GET",
    path: "/api/scene/getSceneObjects/{sceneId}",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
        var payloadData = request.params
      return new Promise((resolve, reject) => {
        Controller.SceneController.getSceneObjects(userData,payloadData, function(
          err,
          data
        ) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    config: {
      description: "get all sceenes",
      tags: ["api", "scene"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        params:{
            sceneId: Joi.string().required()
        },
        failAction: UniversalFunctions.failActionFunction
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  }

 var SceneRoute = [
    createScene,
    createGameObjects,
    addGameObjectsToScene,
    getAllScenes,
    getAllGameObjects,
    //getSceneObjects
  ];
  module.exports = SceneRoute;