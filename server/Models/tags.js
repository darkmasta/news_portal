var mongoose = require("mongoose");
var Tags = require("../Schemas/tags_schema"); // Customer Schema

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //   console.log("Database connection succeeded.");
});

var Tag = mongoose.model("Tag", Tags.tagSchema);

module.exports.Tag = Tag;
