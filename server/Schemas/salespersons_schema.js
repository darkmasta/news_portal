var mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose, 5)

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var salespersonSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  businessName: String,
  dbaName: String,
  primaryPhone: String,
  cellPhone: String,
  dealershipType: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  signature: String,
  file1name: String,
  file2name: String,
  licenNumber: String,
  taxNumber: String,
  about: String,
  isVerified: Boolean,
  date: { type: Date, default: Date.now }
})

module.exports.salespersonSchema = salespersonSchema