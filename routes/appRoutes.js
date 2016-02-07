// routes/appRoutes.js

// packages
var path = require('path');
var User = require('../models/user');
var Record = require('../models/record');

module.exports = function(app, passport) {
  var profile = require('../controllers/profileController.js');
// server routes
// =============================================================================

// login routes ================================================================
// get
app.get('/api/login', function(req, res) {

  res.json({message: "Welcome to the login!"});
});

// post
app.post('/api/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the main profile page
  failureRedirect: '/login' // redirect back to the login page if login fails
}));

// signup routes ===============================================================
// get
app.get('/api/signup', function(req, res) {

  res.json({message: "Welcome! Now sign up!"});
});

// post
app.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to profile page
  failureRedirect: '/signup'
}));

// logout routes ===============================================================
// get
app.get('/api/logout', function(req, res) {

  res.json({message: "Don't let the door hit you on your way out"});
});

// user routes =================================================================
app.get('/api/profile/', isLoggedIn, profile.getProfile);

// frontend routes
// =============================================================================
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // if not logged in, send them back to login
  res.redirect('/api/logout')
}
