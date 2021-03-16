var mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose, 5)

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var Quote = require('../Models/quotes')

var ticketSchema = new Schema({
  owner: ObjectId,
  ownerEmail: String,
  quote: String,
  topic: String,
  messages: [{ text: String, date: {type: Date, default: Date.now}, owner: { type: Schema.Types.ObjectId, ref: 'Quote' }}],
  state: String,
  date: { type: Date, default: Date.now }
})

module.exports.ticketSchema = ticketSchema
