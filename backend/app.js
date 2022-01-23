const express = require('express');

global.express = express;

global.app = express();
global.router = express.Router();

global.BASE_PATH = __dirname;

// default enviornment if it is not specified.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.configHolder = require('./configurations/dependency-include');

// application middlwares
require('./middlewares/AppMiddlewares');

// application routing
require('./configurations/layers/index')(__dirname);

// test server is running
app.get('/', (req, res) => res.send('Service is running'));

configHolder.bootstrap.initApp();