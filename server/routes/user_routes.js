require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");
var Leads = require("../Models/leads");
var Customers = require("../Models/customers");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
const { doc } = require("prettier");

router.get("/users", function (req, res) {
  var userArr = [];
  var query = Users.User.find();

  query.exec(function (err, users) {
    if (err) console.log(err);
    if (users != null) {
      _.each(users, function (user, index) {
        userArr.push(user);
      });

      res.json(userArr);
    }
  });
});

router.get("/user", function (req, res) {
  var cookieData = CryptoJS.AES.decrypt(
    req.cookies.defensehere,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var email = cookieData.split("~")[0];

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

router.post("/user_by_id", jsonParser, function (req, res) {
  var userData = req.body.data;
  console.log(req.body);

  var promise = Users.User.find({ _id: userData.id });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

router.post("/update_user_profile", jsonParser, function (req, res) {
  var userData = req.body.data;
  var cookieData = CryptoJS.AES.decrypt(
    req.cookies.defensehere,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var email = cookieData.split("~")[0];
  var isAdmin = cookieData.split("~")[1]; // admin, editor, or writer

  if (String(isAdmin).toLowerCase() == "admin") {
    let firstName = userData.name.split(" ")[0];
    let lastName = userData.name.split(" ")[1];
    let userRole = String(userData.userRole).toLowerCase();

    var query = { email: userData.email };
    var update = {
      firstName: firstName,
      lastName: lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
      userRole: userRole,
    };

    var options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    };

    Users.User.findOneAndUpdate(query, update, options, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    });
  } else {
    res.json("Error");
  }
});

router.post("/create_new_user", jsonParser, function (req, res) {
  var userData = req.body.data;
  var cookieData = CryptoJS.AES.decrypt(
    req.cookies.defensehere,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var email = cookieData.split("~")[0];
  var isAdmin = cookieData.split("~")[1]; // admin, editor, or writer

  if (isAdmin == "admin") {
    var User = new Users.User({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      password: userData.password,
      userRole: String(userData.userRole).toLowerCase(),
    });

    var promise = User.save();

    promise.then(function (doc2) {
      console.log(doc2);
      res.json(doc2);
    });
  } else {
    res.json("Error");
  }
});

router.post("/delete_user", jsonParser, function (req, res) {
  var userData = req.body.data;
  var cookieData = CryptoJS.AES.decrypt(
    req.cookies.defensehere,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var isAdmin = cookieData.split("~")[1]; // admin, editor, or writer

  if (isAdmin == "admin") {
    Users.User.findOneAndDelete({ _id: userData.id })
      .exec()
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  } else {
    res.json("Error");
  }
});

module.exports = router;
