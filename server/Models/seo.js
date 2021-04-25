var mongoose = require("mongoose");
var Seos = require("../Schemas/seo_schema");

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

var Seo = mongoose.model("Seo", Seos.seoSchema);

module.exports.Seo = Seo;
