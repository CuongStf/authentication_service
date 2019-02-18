const express = require('express');
const route = express.Router();
const cartController = require('../Controllers/addToCart.controller.js')

route.get('/addToCart/:id', cartController.addToCart)

route.get('/')

module.exports = route