const express = require("express");
const router = express.Router();

const Seos = require("../Models/seo");
const Seo = Seos.Seo;
const ba64 = require("ba64");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const _ = require("underscore");
const fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_seo", jsonParser, (req, res) => {
  var promise = Seo.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/update_seo", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  Seo.updateMany(
    {},
    {
      googleImage: data.googleImage,
      googleHeading: data.googleHeading,
      twitterLink: data.twitterLink,
      facebookLink: data.facebookLink,
      instagramLink: data.facebookLink,
      $set: {
        seoKeywords: data.seoKeywords,
      },
    }
  ).then((doc) => {
    res.json(doc);
  });
});

router.post("/update_activity_type_list", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  Seo.updateMany(
    {},
    {
      $set: {
        activityTypeList: data.activityTypeList,
      },
    }
  ).then((doc) => {
    res.json("success");
  });
});

router.post("/change_logo", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body; // form data

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  ba64.writeImage("./images/" + "logo", data.file, (err) => {
    if (err) throw err;

    res.json("success");
    console.log("Site Logo saved successfully");
  });
});

router.post("/change_favicon", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body; // form data

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  ba64.writeImage("./images/" + "favicon", data.file, (err) => {
    if (err) throw err;

    res.json("success");
    console.log("Favicon saved successfully");
  });
});

module.exports = router;
