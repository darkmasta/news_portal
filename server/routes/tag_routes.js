var express = require("express");
var router = express.Router();

var Tags = require("../Models/tags");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_tags", jsonParser, function (req, res) {
  var promise = Tags.Tag.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/create_tag", jsonParser, function (req, res) {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  var tagName = data.tagName;

  if (isAdmin == "admin") {
    var Tag = new Tags.Tag({
      tagName: tagName,
    });

    Tag.save()
      .then((tag) => res.json("success"))
      .catch((err) => res.json(err));
  } else {
    res.json("Error");
  }
});

module.exports = router;
