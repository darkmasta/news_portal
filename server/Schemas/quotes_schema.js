var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var carSchema = require("../Schemas/cars_schema"); // Quotes Schema
var Car = require("../Models/cars");

var quoteSchema = new Schema({
  owner: ObjectId,
  ownerEmail: String,
  customer: String,
  originAddress: String,
  originCity: String,
  originState: String,
  originZipCode: String,
  profit: Number,
  cars: [
    {
      price: Number,
      margin: Number,
      vin: String,
      year: String,
      make: String,
      model: String,
    },
  ],
  notes: String,
  destinationAddress: String,
  destinationCity: String,
  destinationState: String,
  destinationZipCode: Number,
  moveDate: String,
  date: { type: Date, default: Date.now },
});

module.exports.quoteSchema = quoteSchema;
