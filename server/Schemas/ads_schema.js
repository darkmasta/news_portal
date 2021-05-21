const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const adSchema = new Schema({
  owner: String,
  ownerEmail: String,
  adName: { type: String, unique: true },
  adTitle: { type: String, unique: true },
  adType: String,
  adLanguage: String,
  adImage: { type: String, required: true },
  link: { type: String, required: true },
  status: String,
  creationDate: { type: Date, default: Date.now },
  startDate: Date,
  views: Number,
  clicks: Number,
  endDate: Date
})

module.exports.adSchema = adSchema
