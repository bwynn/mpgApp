// models/record.js

// packages
// =============================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// record schema
// =============================================================================
var RecordSchema = new Schema({
  time: {type: Date, default: Date.now},
  mpg: Number,
  miles: Number,
  gallons: Number,
  car: String,
  idx: Number
});

module.exports = mongoose.model("Record", RecordSchema);
