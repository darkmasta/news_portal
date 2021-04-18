var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var adSchema = new Schema({
  owner: String,
  ownerEmail: String,
  adName: String,
  adTitle: String,
  adType: String,
  adImage: String,
  status: String,
  creationDate: { type: Date, default: Date.now },
  startDate: Date,
  views: Number,
  endDate: Date,
});

module.exports.adSchema = adSchema;
