const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ssoShema = new Schema({
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
})

const ssoModel = mongoose.model('SSO', ssoShema, 'userSSO')

module.exports = ssoModel
