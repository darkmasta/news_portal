var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var postSchema = new Schema({
  owner: ObjectId,
  ownerEmail: String,
  topic: String,
  categories: [String],
  postImage: String,
  content: String,
  state: String,
  date: { type: Date, default: Date.now },
});

module.exports.postSchema = postSchema;
