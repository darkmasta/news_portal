var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  password: String,
  userRole: String,
  defaultLang: String,
});

module.exports.userSchema = userSchema;
