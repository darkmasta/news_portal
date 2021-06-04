const mongoose = require('mongoose')

const Schema = mongoose.Schema

const translationSchema = new Schema({
  language: String,
  category: String,
  text: String,
  translation: String
})

module.exports.translationSchema = translationSchema
