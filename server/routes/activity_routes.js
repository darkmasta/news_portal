require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Activities = require("../Models/activities");
var ba64 = require("ba64");

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

  var data = req.body; // form data

  if (isAdmin == "admin" || isAdmin == "editor" || isAdmin == "writer") {
    var Activity = new Activities.Activity({
      activityName: data.activityName,
      activityTitle: data.activityTitle,
      activityPosition: data.activityPosition,
      activityImage: data.fileName + ".jpeg",
      startDate: data.startDate,
      endDate: data.endDate,
    });

    ba64.writeImage("./images/" + data.fileName, data.file, function (err) {
      if (err) throw err;

      console.log("Activity Image saved successfully");

      Activity.save()
        .then((activity) => res.json("success"))
        .catch((err) => res.json(err));
      // do stuff
    });
  } else {
    res.json("Error");
  }
});

module.exports = router;
