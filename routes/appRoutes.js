// routes/appRoutes.js

// packages
var path = require('path');
var User = require('../models/user');
var Record = require('../models/record');

module.exports = function(app, passport) {
  var profileCtrl = require('../controllers/profileController');
  var recordCtrl = require('../controllers/recordController');
  var carCtrl = require('../controllers/carController');
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
  console.log(req.session.passport.user);


  res.json({message: "Don't let the door hit you on your way out"});
});

// user routes =================================================================
// get
app.get('/api/profile/', isLoggedIn, profileCtrl.getProfile);
// update user
app.put('/api/profile', isLoggedIn, profileCtrl.updateProfile);
// delete user
app.delete('/api/profile', isLoggedIn, profileCtrl.deleteProfile);

// add a car
app.put('/api/profile/add_car', isLoggedIn, carCtrl.addCar);
// remove car
app.put('/api/profile/remove_car', isLoggedIn, carCtrl.removeCar);

// update record
app.put('/api/record', isLoggedIn, recordCtrl.updateRecord);
// delete record
app.put('/api/record/delete', isLoggedIn, recordCtrl.deleteRecord);

// frontend routes
// =============================================================================
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // if not logged in, send them back to login
  res.redirect('/api/logout')
}
