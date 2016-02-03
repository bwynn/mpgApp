// routes/appRoutes.js

// packages
var path = require('path');
var User = require('../models/user');
var Record = require('../models/record');

module.exports = function(app, passport) {
// server routes
// =============================================================================

// login routes ================================================================
// get
app.get('/api/login', function(req, res) {

  res.json({message: "Welcome to the login!"});
});

// post

// signup routes ===============================================================
// get
app.get('/api/signup', function(req, res) {

  res.json({message: "Welcome! Now sign up!"});
});

// post

// logout routes ===============================================================
// get
app.get('/api/logout', function(req, res) {

  res.json({message: "Don't let the door hit you on your way out"});
});

// user routes =================================================================
// require controllers/userController.js

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
