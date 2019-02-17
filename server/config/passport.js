// config/passport.js

// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth2').Strategy
// load up the user model
var User = require('../model/sso.model')

// load the auth variables
var configAuth = require('./config.sso')

// expose this function to our app using module.exports
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL

  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    process.nextTick(function () {
      User.findOne({
        'facebook.id': profile.id
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, user)
        } else {
          var newUser = new User()
          console.log(profile)
          newUser.facebook.id = profile.id
          newUser.facebook.token = accessToken
          newUser.facebook.name = profile.displayName
          newUser.facebook.gender = profile.gender
          newUser.save(function (err) {
            if (err) {
              throw err
            }
            return done(null, newUser)
          })
        }
      })
    })
  }))

  passport.use(new GoogleStrategy({
    // pull in our app id and secret from our auth.js file
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => {
    console.log(profile)
    process.nextTick(function () {
      User.findOne({
        'google.id': profile.id
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        // if the user is found, then log them in
        if (user) {
          return done(null, user) // user found, return that user
        } else {
          var newUser = new User()
          // set all of the facebook information in our user model
          newUser.google.id = profile.id
          newUser.google.token = accessToken
          newUser.google.name = profile.displayName
          newUser.google.email = profile.email
          newUser.google.gender = profile.gender
          newUser.save(function (err) {
            if (err) {
              throw err
            }
            // if successful, return the new user
            return done(null, newUser)
          })
        }
      })
    })
  }))
}
