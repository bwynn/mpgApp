// models/car.js

// packages
// =============================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema
// =============================================================================
var CarSchema = new Schema({
  brand: String,
  model: String,
  year: String,
  avg_mpg: Number
});

module.exports = mongoose.model('Car', CarSchema);
