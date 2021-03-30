const express = require("express");
const router = express.Router();
const ba64 = require("ba64");

const Posts = require("../Models/posts");
const Post = Posts.Post;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_posts", jsonParser, function (req, res) {
  Post.find({})
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

router.post("/create_post", jsonParser, function (req, res) {
  var postData = req.body;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin" && !isAdmin == "editor" && isAdmin == "writer")
    res.json("Authentication Error");

  var Post = new Posts.Post({
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
  });
});

router.post("/post_by_id", jsonParser, function (req, res) {
  var postData = req.body.data;

  var promise = Post.find({ _id: postData.id });

  promise.then((doc) => res.json(doc.pop()));
});

module.exports = router;
