/**
 * Created by Navit
 */
"use strict";

var DemoBaseRoute = require("./demoRoute/demoBaseRoute");
var UserBaseRoute = require("./userRoute/userBaseRoute");
var AdminBaseRoute = require("./adminRoute/adminBaseRoute");
var UserAvatarBaseRoute = require("./userAvatarRoute/userAvatarBaseRoute")
var SceneRoute = require("./sceneRoute/sceneRoute");

var APIs = [].concat(DemoBaseRoute, UserBaseRoute, AdminBaseRoute, UserAvatarBaseRoute, SceneRoute);
module.exports = APIs;
