const express = require('express');
const loginValidate = require('../validate/login.validate')
const route = express.Router();
const loginController = require('../Controllers/login.controller')

route.get('/', loginController.login);

route.post('/', loginValidate.loginValidate, loginController.postLogin)

module.exports = route