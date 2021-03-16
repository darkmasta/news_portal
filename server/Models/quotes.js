var mongoose = require("mongoose");
var Quotes = require("../Schemas/quotes_schema"); // Quotes Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
console.log(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function (callback) {
  console.log("Database connection succeeded.");
});

var Quote = mongoose.model("Quote", Quotes.quoteSchema);

module.exports.Quote = Quote;
