const express = require('express')
const route = express.Router()
const passport = require('passport')
const userController = require('../controller/user.controller.js')

route.post('/signup', userController.signup)
route.get('/auth/facebook', passport.authenticate('facebook'))

// handle the callback after facebook has authenticated the user
route.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))

route.get('/auth/google',
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/plus.profile.emails.read'
  }))

route.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
module.exports = route
