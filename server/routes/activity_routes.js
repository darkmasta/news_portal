require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Activities = require("../Models/activities");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_activities", jsonParser, function (req, res) {
  var promise = Activities.Activity.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/create_activity", jsonParser, function (req, res) {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  var tagName = data.tagName;

  if (isAdmin == "admin") {
    var Activity = new Activities.Activity({
      tagName: tagName,
    });

    Activity.save()
      .then((activity) => res.json("success"))
      .catch((err) => res.json(err));
  } else {
    res.json("Error");
  }
});

module.exports = router;
