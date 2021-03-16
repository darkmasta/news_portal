var mongoose = require("mongoose");
var Customers = require("../Schemas/customers_schema"); // Customer Schema
console.log("DB STRING", process.env.MONGODB_CONNECTION_STRING);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database connection succeeded.");
});

var Customer = mongoose.model("Customer", Customers.customerSchema);

module.exports.Customer = Customer;
