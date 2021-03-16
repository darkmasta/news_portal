var mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose,5);


var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var transactionSchema = new Schema({
  steam_id: String,
  display_name: String,
  amount: Number,
  type: String,
  date: Date,
  invoice_id: String,
  price: String,
  is_confirmed: Boolean,
  url: String
});

module.exports.transactionSchema = transactionSchema;  
