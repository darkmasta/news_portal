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
  var email = CryptoJS.AES.decrypt(
    String(req.cookies.nexusweb),
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

router.post("/users", jsonParser, function (req, res) {
  var userData = req.body;
  console.log(req.body);

  var User = new Users.User({
    facebook_id: userData.facebook_id,
    display_name: userData.display_name,
    balance: 0,
  });

  var promise = User.save();

  promise.then(function (doc) {
    res.json(doc);
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

router.get("/users", jsonParser, function (req, res) {
  var userData = req.body.data;
  console.log(req.body);

  var promise = Users.User.find({});

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

router.post("/update_user_balance", jsonParser, function (req, res) {
  var userData = req.body;

  Users.User.update(
    { _id: userData.id },
    { balance: userData.balance },
    {},
    cb
  );
  function cb(err, doc) {
    if (err) console.log(err);
    console.log(doc);
    res.json("success");
  }
});

router.post("/update_user_profile", jsonParser, function (req, res) {
  var userData = req.body.data;
  var email = CryptoJS.AES.decrypt(
    String(req.cookies.nexusweb),
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  console.log(userData);

  let firstName = userData.name.split(" ")[0];
  let lastName = userData.name.split(" ")[1];
  var query = { email: email };
  var update = {
    firstName: firstName,
    lastName: lastName,
    phone: userData.phone,
    address: userData.address,
    about: userData.about,
    zip: userData.zip,
    city: userData.city,
    state: userData.state,
    defaultProfit: userData.defaultProfit,
  };

  console.log(userData);

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
});

module.exports = router;
