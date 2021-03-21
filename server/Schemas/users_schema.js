var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  about: String,
  zip: Number,
  userRole: String,
});

module.exports.userSchema = userSchema;
