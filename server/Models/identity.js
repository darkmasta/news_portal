var mongoose = require("mongoose");
var Identities = require("../Schemas/identity_schema");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database connection succeeded.");
});

var Identity = mongoose.model("Identity", Identities.identitySchema);

module.exports.Identity = Identity;
