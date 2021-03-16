var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var leadSchema = new Schema({
  owner: ObjectId,
  customer: ObjectId,
  from: String,
  to: String,
  cost: Number,
  vin: Number,
  notes: String,
  move_date: String,
});

module.exports.leadSchema = leadSchema;
