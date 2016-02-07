var mongoose = require('mongoose');
var User = require('../models/user');

exports.getProfile = function(req, res) {
  // search for users based on the req.session.passport.user id 
  User.findOne({"_id": req.session.passport.user}, function(err, user) {
    if (err) {
      res.send(err);
    }

    res.json(user);
  });
};
