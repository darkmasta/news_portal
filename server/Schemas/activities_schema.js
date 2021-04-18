var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var activitySchema = new Schema({
  owner: String,
  ownerEmail: String,
  activityName: String,
  activityTitle: String,
  activityType: String,
  activityImage: String,
  status: String,
  creationDate: { type: Date, default: Date.now },
  startDate: Date,
  views: Number,
  endDate: Date,
});

module.exports.activitySchema = activitySchema;
