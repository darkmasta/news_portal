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
var fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_categories", jsonParser, function (req, res) {
  var promise = Categories.Category.find({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/add_top_category", jsonParser, function (req, res) {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  var categoryName = data.categoryName;

  if (isAdmin == "admin") {
    var promise = Categories.Category.updateMany(
      {},
      {
        $push: {
          updatedCategories: { topCategory: categoryName, bottomCategory: "" },
        },
      }
    );

    promise.then(function (doc) {
      res.json("success");
    });
  } else {
    res.json("Error");
  }
});

router.post("/add_bottom_category", jsonParser, function (req, res) {
  var data = req.body.data;
  var topCategory = data.topCategory;
  var bottomCategory = data.bottomCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (isAdmin == "admin") {
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
  } else {
    res.json("Error");
  }
});

router.post("/delete_top_category", jsonParser, function (req, res) {
  var data = req.body.data;
  var topCategory = data.topCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (isAdmin == "admin") {
    var promise = Categories.Category.update(
      { "updatedCategories.topCategory": topCategory },
      {
        $pull: {
          updatedCategories: {
            topCategory: topCategory,
          },
        },
      }
    );
    promise.then(function (doc) {
      res.json(doc);
    });
  } else {
    res.json("Error");
  }
});

router.post("/delete_bottom_category", jsonParser, function (req, res) {
  var data = req.body.data;
  var bottomCategory = data.bottomCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (isAdmin == "admin") {
    var promise = Categories.Category.update(
      { "updatedCategories.bottomCategory": bottomCategory },
      {
        $pull: {
          updatedCategories: {
            bottomCategory: bottomCategory,
          },
        },
      }
    );
    promise.then(function (doc) {
      res.json(doc);
    });
  } else {
    res.json("Error");
  }
});

router.post("/upload_image", jsonParser, function (req, res) {
  var img = req.files.file;

  fs.writeFile("./images/" + img.name, img.data, "binary", function (err) {
    if (err) throw err;
    console.log("File saved.");
    res.json("success");
  });
});

module.exports = router;
