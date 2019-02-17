const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  year_publish: {
    type: Number
  }
}, {
  versionKey: false
})

//
var bookModel = mongoose.model('book', bookSchema, 'book')

module.exports = bookModel
