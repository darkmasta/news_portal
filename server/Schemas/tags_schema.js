var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
  tagText: String,
  tagName: String,
  order: Number,
  uses: Number,
  date: { type: Date, default: Date.now },
});

module.exports.tagSchema = tagSchema;
