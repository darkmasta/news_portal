require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");
var Categories = require("../Models/categories");
var categoryData = require("../Schemas/categories_data");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
var fs = require("fs");
const { ObjectID } = require("mongodb");

router.post("/get_categories", jsonParser, function (req, res) {
  var promise = Categories.Category.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/add_top_category", jsonParser, function (req, res) {
  var data = req.body.data;

  var categoryName = data.categoryName;

  var promise = Categories.Category.updateMany(
    {},
    {
      $push: {
        updatedCategories: { topCategory: categoryName, bottomCategory: "" },
      },
    }
  );

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/add_bottom_category", jsonParser, function (req, res) {
  var data = req.body.data;
  var topCategory = data.topCategory;
  var bottomCategory = data.bottomCategory;

  var promise = Categories.Category.updateMany(
    {},
    {
      $push: {
        updatedCategories: {
          topCategory: topCategory,
          bottomCategory: bottomCategory,
        },
      },
    }
  );
  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/upload_image", jsonParser, function (req, res) {
  var img = req.files.files;
  console.log(img.name);

  fs.writeFile("./images/" + img.name, img.data, "binary", function (err) {
    if (err) throw err;
    console.log("File saved.");
    res.json("success");
  });
});

module.exports = router;
