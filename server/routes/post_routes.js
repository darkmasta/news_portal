require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");
var Posts = require("../Models/posts");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
var fs = require("fs");
const { ObjectID } = require("mongodb");

router.post("/get_posts", jsonParser, function (req, res) {
  var promise = Posts.Post.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/create_post", jsonParser, function (req, res) {
  var postData = req.body.data;
  var cookieData = CryptoJS.AES.decrypt(
    req.cookies.defensehere,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var email = cookieData.split("~")[0];
  var isAdmin = cookieData.split("~")[1]; // admin, editor, or writer

  if (isAdmin == "admin" || isAdmin == "editor" || isAdmin == "writer") {
    var Post = new Posts.Post({
      owner: postData.owner,
      content: postData.content,
      categories: postData.categories,
      topic: postData.topic,
    });

    Post.save()
      .exec()
      .then((post) => res.json(post))
      .catch((err) => res.json(err));
  } else {
    res.json("Error");
  }
});

router.post("/post_by_id", jsonParser, function (req, res) {
  var postData = req.body.data;
  console.log(req.body);

  var promise = Posts.Post.find({ _id: postData.id });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

module.exports = router;
