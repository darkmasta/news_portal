var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var tagSchema = new Schema({
  tagText: String,
});

module.exports.tagSchema = tagSchema;
