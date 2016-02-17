var mongoose = require('mongoose');
var User = require('../models/user');
var Car = require('../models/car');

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
    car.idx = req.body.idx;
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

exports.removeCar = function(req, res) {
  User.findOne({'_id': req.session.passport.user}, function(err, user) {
    User.update({'details.email': req.body.email}, {
      $pull: { 'details.car': {'_id': req.body.id} }
    }, function(err, user) {
      if (err) {
        res.send(err);
      }

      res.json({message: "Car successfully removed"});
    });
  });
};
