const express = require("express");
const router = express.Router();

const Identities = require("../Models/identity");
const Identity = Identities.Identity;
const ba64 = require("ba64");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const _ = require("underscore");
const fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_identity", jsonParser, (req, res) => {
  var promise = Identity.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/update_identity", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  if (!isAdmin == "admin" && !isAdmin == "editor" && !isAdmin == "writer")
    res.json("Authorization Error");

  Identity.updateMany(
    {},
    {
      kunyeHeading: data.kunyeHeading,
      $set: {
        kunyeImtiyaz: data.kunyeImtiyaz,
        genelYayinYonetmeni: data.genelYayinYonetmeni,
        arabicNews: data.arabicNews,
        englishNews: data.englishNews,
        russianNews: data.russianNews,
        turkishNews: data.turkishNews,
        camera: data.camera,
        postProduction: data.postProduction,
        lawyer: data.lawyer,
        sound: data.sound,
      },
    }
  ).then((doc) => {
    res.json(doc);
  });
});

module.exports = router;
