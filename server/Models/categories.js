var mongoose = require("mongoose");
var Categories = require("../Schemas/categories_schema");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database connection succeeded.");
});

var Category = mongoose.model("Category", Categories.categorySchema);

module.exports.Category = Category;
