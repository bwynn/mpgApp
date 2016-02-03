var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  time: Date,
  mpg: Number,
  car: String
});

module.exports = mongoose.model("Record", RecordSchema);
