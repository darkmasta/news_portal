var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var quoteSchema = require("../Schemas/quotes_schema"); // Quotes Schema
var Quote = require("../Models/quotes");

var orderSchema = new Schema({
  owner: ObjectId,
  ownerEmail: String,
  quote: { type: Schema.Types.ObjectId, ref: "Quote" },
  cost: Number,
  profit: Number,
  shipperInfo: {
    shipper: String,
    email: String,
    address1: String,
    address2: String,
    firstName: String,
    lastName: String,
    phone: String,
    mobile: String,
    city: String,
    zip: Number,
    company: String,
  },
  pickupInfo: {
    address1: String,
    address2: String,
    contact: String,
    phone: String,
    mobile: String,
    city: String,
    zip: Number,
    buyerNumber: String,
    company: String,
  },
  deliveryInfo: {
    address1: String,
    address2: String,
    contact: String,
    phone: String,
    mobile: String,
    city: String,
    zip: Number,
    buyerNumber: String,
    company: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports.orderSchema = orderSchema;
