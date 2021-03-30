var mongoose = require("mongoose");
var Users = require("../Schemas/users_schema");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  //console.log('Database connection succeeded.')
});

var User = mongoose.model("User", Users.userSchema);

module.exports.User = User;
