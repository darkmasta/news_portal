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

router.post("/get_activities", jsonParser, (req, res) => {
  var promise = Activity.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/get_activity", jsonParser, (req, res) => {
  var activityData = req.body.data;

  Activity.find({ _id: activityData.id }).then((doc) => res.json(doc.pop()));
});

router.post("/create_activity", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body; // form data

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  var Activity = new Activities.Activity({
    owner: data.owner,
    ownerEmail: email,
    activityTitle: data.activityTitle,
    activityType: data.activityType,
    status: "unconfirmed",
    activityImage: data.fileName + ".jpeg",
    startDate: data.startDate,
    endDate: data.endDate,
  });

  ba64.writeImage("./images/" + data.fileName, data.file, (err) => {
    if (err) throw err;

    console.log("Activity Image saved successfully");

    Activity.save()
      .then((activity) => res.json("success"))
      .catch((err) => res.json(err));
  });
});

router.post("/update_activity", jsonParser, (req, res) => {
  var activityData = req.body;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  Activity.updateOne(
    { _id: activityData.id },
    {
      activityTitle: activityData.activityTitle,
      activityType: activityData.activityType,
      status: activityData.status,
      activityImage: activityData.fileName,
      startDate: activityData.startDate,
      endDate: activityData.endDate,
    }
  ).then((doc) => {
    ba64.writeImage(
      "./images/" + activityData.fileName,
      activityData.file,
      (err) => {
        if (err) res.json(err);

        console.log("Activity Image saved successfully");

        res.json("success");
      }
    );
  });
});

router.post("/confirm_activity", jsonParser, (req, res) => {
  var activityData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin" && !isAdmin == "editor")
    res.json("Authentication Error");

  Activity.updateOne(
    { _id: activityData.id },
    {
      status: "confirmed",
    }
  ).then((doc) => res.json("success"));
});

router.post("/unconfirm_activity", jsonParser, (req, res) => {
  var activityData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin" && !isAdmin == "editor")
    res.json("Authentication Error");

  Activity.updateOne(
    { _id: activityData.id },
    {
      status: "unconfirmed",
    }
  ).then((doc) => res.json("success"));
});

router.post("/delete_activity", jsonParser, (req, res) => {
  var activityData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Activity.findOneAndDelete({ _id: activityData.id });

  promise.then((doc) => res.json("success"));
});

module.exports = router;
