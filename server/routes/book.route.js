const express = require('express')
const route = express.Router()
const bookController = require('../controller/book.controller.js')

route.get('/', bookController.index)
route.post('/create', bookController.createBook)
route.post('/delete', bookController.deleteBook)
route.post('/edit', bookController.editBook)

module.exports = route
