require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

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
  var img = req.files.file;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  // console.log("POST_DATA", postData);
  // console.log("REQ_BODY", req.body);
  // console.log("FILES", req.files);

  if (isAdmin == "admin" || isAdmin == "editor" || isAdmin == "writer") {
    var Post = new Posts.Post({
      owner: postData.owner,
      content: postData.editorData,
      categories: postData.categories,
      postTitle: postData.postTitle,
      topic: postData.topic,
      postImage: img.name,
    });

    fs.writeFile("./images/" + img.name, img.data, "binary", function (err) {
      if (err) throw err;
      console.log("File saved.");

      Post.save()
        .then((post) => res.json("success"))
        .catch((err) => res.json(err));
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
