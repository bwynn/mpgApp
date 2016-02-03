// models/record.js

// packages
// =============================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// record schema
// =============================================================================
var RecordSchema = new Schema({
  time: Date,
  mpg: Number,
  car: String
});

module.exports = mongoose.model("Record", RecordSchema);
