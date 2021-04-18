const express = require("express");
const router = express.Router();

const Ads = require("../Models/ads");
const Ad = Ads.Ad;
const ba64 = require("ba64");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const _ = require("underscore");
const fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_ads", jsonParser, (req, res) => {
  var promise = Ad.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/get_ad", jsonParser, (req, res) => {
  var adData = req.body.data;

  Ad.find({ _id: adData.id }).then((doc) => res.json(doc.pop()));
});

router.post("/create_ad", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body; // form data

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  var Ad = new Ads.Ad({
    owner: data.owner,
    ownerEmail: email,
    adTitle: data.adTitle,
    adType: data.adType,
    status: "unconfirmed",
    adImage: data.fileName + ".jpeg",
  });

  ba64.writeImage("./images/" + data.fileName, data.file, (err) => {
    if (err) throw err;

    console.log("Ad Image saved successfully");

    Ad.save()
      .then((ad) => res.json("success"))
      .catch((err) => res.json(err));
  });
});

router.post("/update_ad", jsonParser, (req, res) => {
  var adData = req.body;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  Ad.updateOne(
    { _id: adData.id },
    {
      adTitle: adData.adTitle,
      adType: adData.adType,
      status: adData.status,
      adImage: adData.fileName,
    }
  ).then((doc) => {
    ba64.writeImage("./images/" + adData.fileName, adData.file, (err) => {
      if (err) res.json(err);

      console.log("Ad Image saved successfully");

      res.json("success");
    });
  });
});

router.post("/confirm_ad", jsonParser, (req, res) => {
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

router.post("/delete_ad", jsonParser, (req, res) => {
  var adData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Ad.findOneAndDelete({ _id: adData.id });

  promise.then((doc) => res.json("success"));
});

module.exports = router;
