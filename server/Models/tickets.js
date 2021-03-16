var mongoose = require("mongoose");
var Tickets = require("../Schemas/tickets_schema"); // Matches Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //console.log('Database connection succeeded.')
});

var Ticket = mongoose.model("Ticket", Tickets.ticketSchema);

module.exports.Ticket = Ticket;
