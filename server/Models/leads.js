var mongoose = require("mongoose");
var Leads = require("../Schemas/leads_schema"); // Leads Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //console.log('Database connection succeeded.')
});

var Lead = mongoose.model("Lead", Leads.leadSchema);

module.exports.Lead = Lead;
