const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var userSchema = new Schema({
  username: {
    require: true,
    type: String,
    unique: true
  },
  password: {
    require: true,
    type: String
  }
}, {
  versionKey: false
})

userSchema.methods.comparePassword = async (inputPassword, trustPassword) => {
  const resultCheck = await bcrypt.compare(inputPassword, trustPassword)
  return resultCheck
}

const userModel = mongoose.model('user', userSchema, 'user')

module.exports = userModel
