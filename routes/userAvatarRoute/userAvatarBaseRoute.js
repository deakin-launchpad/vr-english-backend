/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

var updateUserAvatar = {
    method: "POST",
    path: "/api/user/updateUserAvatar",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      var payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.UserAvatarBaseController.updateUserAvatar(userData, payloadData, function(
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
      description: "update user avatar",
      tags: ["api", "user"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        payload: {
            gender: Joi.string().required().valid([Config.APP_CONSTANTS.DATABASE.USER_GENDER.MALE,Config.APP_CONSTANTS.DATABASE.USER_GENDER.FEMALE]),
            shirtColor: Joi.string().required(),
            shoeColor: Joi.string().required()
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


  var getUserAvatar = {
    method: "GET",
    path: "/api/user/getUserAvatar",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.UserAvatarBaseController.getUserAvatar(userData, function(
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
      description: "get user avatar",
      tags: ["api", "user"],
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

  var getOtherUserAvatar = {
    method: "GET",
    path: "/api/user/getOtherUserAvatar/{userId}",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
        var payloadData = request.params
      return new Promise((resolve, reject) => {
        Controller.UserAvatarBaseController.getOtherUserAvatar(userData,payloadData, function(
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
      description: "get user avatar",
      tags: ["api", "user"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        params:{
          userId: Joi.string().required()
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

var UserAvatarBaseRoute = [
    updateUserAvatar,
    getUserAvatar,
    getOtherUserAvatar
  ];
  module.exports = UserAvatarBaseRoute;