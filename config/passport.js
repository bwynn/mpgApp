// config/passport.js

// packages
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

// passport session set up
// =============================================================================

// serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // sign up
  // =============================================================================

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // pass back the req to the callback
  },
  function(req, email, password, done) {

    // asyc setup
    // User.findOne wont fire until data is sent back
    process.nextTick(function() {

      // find user by email
      User.findOne({'local.email': email}, function(err, user) {
        if (err) {
          return done(err);
        }

        // check for duplicate users
        if (user) {
          return done(null, false , req.flash('signupMessage', 'This username is already taken'));
        }
        else {
          // no username already taken
          var newUser = new User();

          // set credentials
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

// log in
// =============================================================================
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {

    User.findOne({'local.email': email}, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found'));
      }

      // if pw is wrong
      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Wrong password'));
      }

      // if everything passes
      return done(null, user);
    });
  }));
};
