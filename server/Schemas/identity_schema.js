var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  kunyeHeading: String,
  kunyeImtiyaz: [String],
  genelYayinYonetmeni: [String],
  arabicNews: [String],
  englishNews: [String],
  russianNews: [String],
  turkishNews: [String],
  camera: [String],
  postProduction: [String],
  lawyer: [String],
  sound: [String],
  contactHeading: String,
  contactContent: String,
  aboutHeading: String,
  aboutContent: String,
});

module.exports.identitySchema = identitySchema;
