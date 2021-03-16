var mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose, 5)

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var customerSchema = new Schema({
  display_name: String,
  facebook_id: String,
  fullName: String,
  city: String,
  zipCode: String,
  state: String,
  about: String,
  email: String,
  password: String,
  owner: ObjectId,
  phone: Number,
  notes: String,
  address: String
})

module.exports.customerSchema = customerSchema
