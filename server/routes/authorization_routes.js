require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
const { enc } = require("crypto-js");

router.get("/success", function (req, res) {
  var query = Users.User.findOne({ email: req.user.email });

  query.exec(function (err, user) {
    if (err) {
      return handleError(err);
      res.json("Error finding user");
    }
    if (user == null) {
      // email not found
      res.json("Error signing in");
    } else {
      req.user.data = user;
      var encryptData = req.user.email;

      console.log(user);

      encryptData += "~";
      encryptData += user.userRole;

      console.log(encryptData);

      var token = CryptoJS.AES.encrypt(
        String(encryptData),
        String(process.env.JWT_SECRET)
      ).toString();

      res.cookie("defensehere", token, { maxAge: 90000000 });
      res.json("Success");
    }
  });
});

router.get("/fail", function (req, res) {
  res.json("Error signing in");
});

module.exports = router;
