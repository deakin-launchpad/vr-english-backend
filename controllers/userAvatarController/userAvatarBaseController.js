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
var TokenManager = require("../../lib/tokenManager");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");

var updateUserAvatar = function (userData, payloadData, callback) {
    var userAvatarExist = false;
    var userAvatarDetails = null;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, {}, {}, function (
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
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            Service.UserAvatarService.getUserAvatar(criteria, {}, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length != 0) {
                        userAvatarExist = true;
                        userAvatarDetails = data[0]
                        cb()
                    }
                    else cb()
                }
            })
        },
        function (cb) {
            if (userAvatarExist) {
                var criteria = {
                    _id: userAvatarDetails._id
                }
                var dataToUpdate = {
                    $set: {
                        gender: payloadData.gender,
                        shirtColor: payloadData.shirtColor,
                        shoeColor: payloadData.shoeColor
                    }
                }

                Service.UserAvatarService.updateUserAvatar(criteria, dataToUpdate, {}, function (err, data) {
                    if (err) cb(err)
                    else {
                        userAvatarDetails = (data) || null;
                        cb()
                    }
                })
            }
            else {
                var dataToSave = {
                    userId: userData._id,
                    gender: payloadData.gender,
                    shirtColor: payloadData.shirtColor,
                    shoeColor: payloadData.shoeColor
                }
                Service.UserAvatarService.createUserAvatar(dataToSave, function (err, data) {
                    if (err) cb(err)
                    else {
                        userAvatarDetails = data || null;
                        cb()
                    }
                })
            }
        },
        function (cb) {
            if (!userAvatarExist) {
                var criteria = {
                    _id: userData._id
                }
                var dataToUpdate = {
                    $set: {
                        firstLogin: true
                    }
                }
                Service.UserService.updateUser(criteria, dataToUpdate, {}, function (err, data) {
                    if (err) cb(err)
                    else cb()
                })
            }
            else cb()
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { userAvatarDetails: userAvatarDetails })
        })
}

var getUserAvatar = function (userData, callback) {
    var userAvatarDetails = null;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, {}, {}, function (
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
        function (cb) {
            var criteria = {
                userId: userData._id
            }
            Service.UserAvatarService.getUserAvatar(criteria, {}, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length != 0) {
                        userAvatarDetails = data && data[0]
                        cb()
                    }
                    else cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { userAvatarDetails: userAvatarDetails })
        })
}

var getOtherUserAvatar = function (userData,payloadData, callback) {
    var userAvatarDetails = null;
    async.series([
        function (cb) {
            var criteria = {
                _id: userData._id
            };
            Service.UserService.getUser(criteria, {}, {}, function (
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
        function (cb) {
            var criteria = {
                userId: payloadData.userId
            }
            Service.UserAvatarService.getUserAvatar(criteria, {}, {}, function (err, data) {
                if (err) cb(err);
                else {
                    if (data.length != 0) {
                        userAvatarDetails = data && data[0]
                        cb()
                    }
                    else cb()
                }
            })
        }
    ],
        function (error, result) {
            if (error) callback(error)
            else callback(null, { userAvatarDetails: userAvatarDetails })
        })
}

module.exports = {
    updateUserAvatar: updateUserAvatar,
    getUserAvatar: getUserAvatar,
    getOtherUserAvatar: getOtherUserAvatar
};