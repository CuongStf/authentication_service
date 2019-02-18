const express = require('express');
const route = express.Router();
const productController = require('../Controllers/product.controller.js');

route.get('/', productController.getListProducts);

module.exports = route