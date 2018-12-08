const express = require('express');
const server = express();

const configureMiddleware = require('../config/middleware');
const routers = require('../config/routers');

// middleware
configureMiddleware(server);

// routers
routers.projectRouters(server);

module.exports = server;