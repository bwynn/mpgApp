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
    user.details.email = req.body.email;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: "User successfully updated"});
    });
  });
};

exports.addCar = function(req, res) {
  // Find user and update car details
  User.findOne({'_id': req.session.passport.user}, function(err, user) {
    if (err) {
      res.send(err);
    }
    // add car details
    var car = new Car(); // create a new car
    car.model = req.body.model;
    car.brand = req.body.brand;
    car.year = req.body.year;
    // save to instance of user
    User.update({'details.email': req.body.email}, {
      $push: {
        "details.car": JSON.parse(JSON.stringify(car)) // push instance of car into user details
      }
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json(user);
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
