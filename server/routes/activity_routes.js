const express = require("express");
const router = express.Router();

const Activities = require("../Models/activities");
const Activity = Activities.Activity;
const ba64 = require("ba64");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const _ = require("underscore");
const fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_activities", jsonParser, function (req, res) {
  var promise = Activity.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/create_activity", jsonParser, function (req, res) {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body; // form data

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

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
  });
});

module.exports = router;
