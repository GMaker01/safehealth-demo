/*
 * @author Shubham Sharma
 * Requirement - include all the global variables and module required by the application
 */

 // Sentry
require('./sentry');

global.To = require('await-to-js').to;
global.mkdirp = require('mkdirp');
global.mongoose_softDelete = require('mongoose-softdelete');
global.path = require('path');
global.url = require('url');
global.validate = require('express-validation');
global.Joi = require('joi');
global._ = require('lodash');
global.requireDirectory = require('../utilities/require-directory');
global.Logger = require('../utilities/logger-utility');
const util = require('util');

global.promisify = util.promisify;

// global variable to hold all the environment specific configuration
global.configHolder = {};

// Application specific configuration details
configHolder.config = require('./conf.js')();

// Database dependencies and Connection setting
global.mongoose = require('mongoose');

global.MongooseSchema = mongoose.Schema;
global.dbConnection = require('./datasource')();

global.ObjectId = mongoose.Types.ObjectId;

// Application specific intial program to execute when server starts
configHolder.bootstrap = require('./bootstrap');

// Application specific security authorization middleware
configHolder.security = require('../middlewares/authentication');

// Response handler
configHolder.responseHandler = require('../utilities/response-handler');

// UTILITY CLASSES
configHolder.messages = require('./application-messages');
global.domain = require('./domain-include');
global.validationSchema = require('../application/validations/index');

module.exports = configHolder;
