const express = require('express');

const router = express.Router();

const pingRoutes = require('./ping');

const userRoutes = require('./users');


pingRoutes(router);
userRoutes(router)

module.exports = router;