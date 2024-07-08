const express = require("express");
const userLoginRoutes = express.Router();
const userLogin = require('../controllers/controller.user.login');

userLoginRoutes.get('/', userLogin.findByQuery);

module.exports = userLoginRoutes;