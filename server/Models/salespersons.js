var mongoose = require("mongoose");
var SalesPersons = require("../Schemas/salespersons_schema"); // Customer Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //console.log('Database connection succeeded.')
});

var SalesPerson = mongoose.model("SalesPerson", SalesPersons.salespersonSchema);

module.exports.SalesPerson = SalesPerson;
