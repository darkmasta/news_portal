const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
  tagText: String,
  tagName: String,
  order: Number,
  uses: Number,
  date: { type: Date, default: Date.now }
})

module.exports.tagSchema = tagSchema
