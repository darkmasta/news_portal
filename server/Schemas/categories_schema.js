const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  companies: [String], // sirketler
  companiesColor: [String],
  clustering: [String], // kumelenme
  clusteringColor: [String], // kumelenme
  countries: [String], // ulkeler
  countriesColor: [String], // ulkeler
  thinkTank: [String], // dusunce kurulusu
  thinkTankColor: [String], // dusunce kurulusu
  sources: [String], // kaynaklar
  sourcesColor: [String], // kaynaklar
  youtubers: [String], //  youtuber'lar
  youtubersColor: [String], //  youtuber'lar
  institutions: [String], // Kurunlar
  institutionsColor: [String], // Kurunlar
  mainCategories: [String], // Ana Kategoriler
  mainCategoriesColor: [String], // Ana Kategoriler
  singleCategories: [String], // Tekli kategoriler
  singleCategoriesColor: [String], // Tekli kategoriler
  updatedCategories: [
    {
      topCategory: String, // Sonradan eklenenleri buraya yazacaz
      bottomCategory: String,
      color: String,
      topColor: String
    }
  ],
  kunyeHeading: String,
  contactHeading: String,
  aboutHeading: String
})

module.exports.categorySchema = categorySchema
