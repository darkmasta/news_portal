var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = new Schema({
  companies: [String], // sirketler
  clustering: [String], // kumelenme
  countries: [String], //ulkeler
  thinkTank: [String], // dusunce kurulusu
  sources: [String], // kaynaklar
  youtubers: [String], //  youtuber'lar
  institutions: [String], // Kurunlar
  mainCategories: [String], // Ana Kategoriler
  singleCategories: [String], // Tekli kategoriler
  updatedCategories: [
    {
      topCategory: String, // Sonradan eklenenleri buraya yazacaz
      bottomCategory: String,
    },
  ],
});

module.exports.categorySchema = categorySchema;
