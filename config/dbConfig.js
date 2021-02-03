/**
 * Created by Navit
 */

 'use strict';

var mongo = {
    URI_DEV: process.env.MONGO_URI || "mongodb://localhost/VR_English",
    URI_TEST: process.env.MONGO_URI || "mongodb://" + process.env.MONGO_USER_VR_ENGLISH_TEST + ":" + process.env.MONGO_PASS_VR_ENGLISH_TEST + "@localhost/" +process.env.MONGO_DBNAME_VR_ENGLISH_TEST,
    URI_STAGING: process.env.MONGO_URI || "mongodb://" + process.env.MONGO_USER_VR_ENGLISH_STAGING + ":" + process.env.MONGO_PASS_VR_ENGLISH_STAGING + "@localhost/" + process.env.MONGO_DBNAME_VR_ENGLISH_STAGING,
    URI_PRODUCTION: process.env.MONGO_URI || "mongodb://" + process.env.MONGO_USER_VR_ENGLISH_PRODUCTION + ":" + process.env.MONGO_PASS_VR_ENGLISH_PRODUCTION + "@localhost/" + process.env.MONGO_DBNAME_VR_ENGLISH_PRODUCTION,
    port: 27017
  };

module.exports = {
    mongo: mongo
};



