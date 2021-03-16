var mongoose = require("mongoose");
var Orders = require("../Schemas/orders_schema"); // Orders Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //console.log('Database connection succeeded.')
});

var Order = mongoose.model("Order", Orders.orderSchema);

module.exports.Order = Order;
