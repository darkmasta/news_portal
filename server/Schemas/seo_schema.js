var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var seoSchema = new Schema({
  seoKeywords: [String],
  googleHeading: String,
  googleImage: String,
  twitterLink: String,
  instagramLink: String,
  facebookLink: String,
});

module.exports.seoSchema = seoSchema;
