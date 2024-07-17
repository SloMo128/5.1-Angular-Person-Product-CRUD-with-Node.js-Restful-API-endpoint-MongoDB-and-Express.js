const express = require("express");
const httpErrorRouter = express.Router();
const httpError = require('../Controllers/controller.http.error');

// Define the route to find by code
httpErrorRouter.get('/', httpError.findByCode);

module.exports = httpErrorRouter;
