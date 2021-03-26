require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();
var ba64 = require("ba64");

var Users = require("../Models/users");
var Posts = require("../Models/posts");

var fs = require("fs");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_posts", jsonParser, function (req, res) {
  var promise = Posts.Post.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/create_post", jsonParser, function (req, res) {
  var postData = req.body;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (isAdmin == "admin" || isAdmin == "editor" || isAdmin == "writer") {
    var Post = new Posts.Post({
      owner: email,
      content: postData.editorData,
      categories: postData.categories,
      postTitle: postData.postTitle,
      topic: postData.topic,
      postImage: postData.fileName + ".jpeg",
    });

    ba64.writeImage("./images/" + postData.fileName, postData.file, function (
      err
    ) {
      if (err) throw err;

      console.log("Post Image saved successfully");

      Post.save()
        .then((post) => res.json("success"))
        .catch((err) => res.json(err));

      // do stuff
    });
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
