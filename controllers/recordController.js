var mongoose = require('mongoose');
var User = require('../models/user');
var Record = require('../models/record');

exports.updateRecord = function(req, res) {
  User.findOne({'_id': req.session.passport.user}, function(err, user) {

    var record = new Record();
    // set value for mpg
    record.mpg = req.body.mpg;
    // set value for car
    record.car = req.body.car; // get this from the user's car(s) - list model name - handle property on front end
    record.gallons = req.body.gallons; // set gallons
    record.miles = req.body.miles; // set miles
    User.update({"local.email": req.body.email}, { // query the 'details.email' property based on user email
      $push: { // from there, push
        "details.record": record, // object to the user details
      }
    }, function(err, user) {
      if (err) {
        res.send(err);
      }
      // notify update results
      res.json(user);
    });
  });
};

exports.deleteRecord = function(req, res) {
  User.findOne({'_id': req.session.passport.user}, function(err, user) {
    User.update({'local.email': req.body.email}, {
      $pull: { 'details.record': {'_id': req.body.id} } // get data.id value on front end
    }, function(err) {
      if (err) {
        res.send(err);
      }

      res.json({message: "Record successfully deleted"});
    })
  })
};
