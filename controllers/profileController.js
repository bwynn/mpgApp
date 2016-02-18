var mongoose = require('mongoose');
var User = require('../models/user');
var Car = require('../models/car');

// this method will fetch a user's profile and load it into the profile view
exports.getProfile = function(req, res) {
  // search for users based on the req.session.passport.user id
  User.findOne({"_id": req.session.passport.user}, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
};

// update the user using a put request
exports.updateProfile = function(req, res) {
  // find user and update profile details
  User.findOne({'_id': req.session.passport.user}, function(err, user) {
    if (err) {
      res.send(err);
    }
    // add conditional to verify old_pw - verify update first
    // update password
    // user.local.password = req.body.password;
    // update username
    user.local.username = req.body.username;
    // update email
    user.local.email = req.body.email;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: "User successfully updated"});
    });
  });
};

// delete user from db
exports.deleteProfile = function(req, res) {
  // get user and delete profile
  User.remove({"_id": req.session.passport.user}, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json({message: "User profile successfully deleted"});
  });
};
