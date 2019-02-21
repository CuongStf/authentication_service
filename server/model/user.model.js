const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var userSchema = new Schema({
  local: {
    username: {
      require: true,
      type: String
    },
    password: {
      require: true,
      type: String
    }
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
}, {
  versionKey: false
})

// declare method
userSchema.methods.comparePassword = async (inputPassword, trustPassword) => {
  const resultCheck = await bcrypt.compare(inputPassword, trustPassword)
  return resultCheck
}

userSchema.methods.signToken = async (data) => {
  const token = jwt.sign({
    data: data,
    exp: '7 days'
  }, process.env.SECRET_KEY)
  return token
}

userSchema.methods.verifyToken = (token, callback) => {
  jwt.verify(token, process.env.SECRET_KEY, callback)
}

const userModel = mongoose.model('user', userSchema, 'user')

module.exports = userModel
