var mongoose = require("mongoose");
var Ads = require("../Schemas/ads_schema");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //   console.log("Database connection succeeded.");
});

var Ad = mongoose.model("Ad", Ads.adSchema);

module.exports.Ad = Ad;
