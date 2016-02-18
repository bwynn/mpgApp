// models/user.js

// packages
// =============================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Record = require('./record');
var Car = require('./car');

// user schema
// =============================================================================
var UserSchema = new Schema({
  local: {
    username: String,
    password: String,
    email: String
  },
  details: {
    record: [Record.schema],
    car: [Car.schema]
  }
});

// generate hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("User", UserSchema);
