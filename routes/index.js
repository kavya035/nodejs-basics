const express = require('express');

const router = express.Router();

const pingRoutes = require('./ping');

const userRoutes = require('./users');

const healthcheckRoutes = require('./health-check');

healthcheckRoutes(router);
pingRoutes(router);
userRoutes(router);


module.exports = router;