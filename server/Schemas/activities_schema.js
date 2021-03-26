var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var activitySchema = new Schema({
  activityName: String,
  activityTitle: String,
  activityPosition: String,
  activityImage: String,
  state: String,
  creationDate: { type: Date, default: Date.now },
  startDate: Date,
  endDate: Date,
});

module.exports.activitySchema = activitySchema;
