const UserModel = require('../model/user.model.js')

const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy
var configAuth = require('../config/config.sso')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL

  }, (accessToken, refreshToken, profile, done) => {
    console.log(configAuth.facebookAuth.callbackURL)
    process.nextTick(function () {
      UserModel.findOne({
        'facebook.id': profile.id
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, user)
        } else {
          var newUser = new UserModel()
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
    console.log(configAuth.facebookAuth.callbackURL)
    process.nextTick(function () {
      UserModel.findOne({
        'google.id': profile.id
      }, function (err, user) {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, user)
        } else {
          var newUser = new UserModel()
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

  passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function (req, username, password, done) {
    UserModel.findOne({
      'local.username': username
    }, async function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
          message: 'Account not exist. Check again!'
        })
      }
      let resultCheckPw = await user.comparePassword(password, user.local.password)
      if (resultCheckPw === false) {
        return done(null, false, {
          message: 'Incorrect password!'
        })
      } else return done(null, user)
    })
  }))
}
