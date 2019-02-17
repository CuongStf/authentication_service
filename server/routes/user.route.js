const express = require('express')
const route = express.Router()
const userController = require('../controller/user.controller.js')

route.post('/signup', userController.signup)
route.post('/signin', userController.signin)
// route.get('/auth/facebook', userController.authFacebook)

module.exports = route
