var express = require("express");
var router = express.Router();

var Tags = require("../Models/tags");
var Tag = Tags.Tag;

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

router.post("/get_tag", jsonParser, (req, res) => {
  var data = req.body.data;

  Tag.find({ _id: data.id })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json("Server Error");
    });
});

router.post("/create_tag", jsonParser, function (req, res) {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;
  if (!isAdmin == "admin") res.json("Authorization Error");

  var Tag = new Tags.Tag({
    tagName: data.tagName,
  });

  Tag.save()
    .then((tag) => res.json("success"))
    .catch((err) => res.json(err));
});

router.post("/update_tag", jsonParser, (req, res) => {
  var data = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin" && !isAdmin == "editor")
    res.json("Authentication Error");

  Tag.updateOne(
    { _id: data.id },
    {
      tagName: data.tagName,
    }
  ).then((doc) => res.json("success"));
});

router.post("/use_tag", jsonParser, (req, res) => {
  var data = req.body.data;

  Tag.findOneAndUpdate({ _id: data.id }, { $inc: { uses: 1 } })
    .then((doc) => {
      res.json("success");
    })
    .catch((err) => {
      res.json("Server Error");
    });
});

router.post("/delete_tag", jsonParser, (req, res) => {
  var tagData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Tags.Tag.findOneAndDelete({ _id: tagData.id });

  promise.then((doc) => res.json("success"));
});

module.exports = router;
