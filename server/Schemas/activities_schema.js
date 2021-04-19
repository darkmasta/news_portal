var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var activitySchema = new Schema({
  owner: String,
  ownerEmail: String,
  activityName: { type: String, unique: true, required: true },
  activityTitle: { type: String, unique: true, required: true },
  activityType: { type: String, required: true },
  activityImage: { type: String, required: true },
  status: String,
  visible: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now },
  startDate: Date,
  views: Number,
  endDate: Date,
});

module.exports.activitySchema = activitySchema;
