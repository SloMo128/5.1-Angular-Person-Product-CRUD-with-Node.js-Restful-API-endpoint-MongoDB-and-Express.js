const express = require("express");
const userLoginRoutes = express.Router();
const userLogin = require('../Controllers/controller.user.login');

userLoginRoutes.get('/', userLogin.findByQuery);

module.exports = userLoginRoutes;