const express = require("express");
const router = express.Router();

const Categories = require("../Models/categories");
const Category = Categories.Category;
const categoryData = require("../Schemas/categories_data");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fs = require("fs");
const { decodeCookie } = require("../helpers/decode-cookie");

router.post("/get_categories", jsonParser, (req, res) => {
  var promise = Category.find({});

  promise.then((doc) => res.json(doc)).catch((err) => res.json(err));
});

router.post("/add_top_category", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  var categoryName = data.categoryName;

  if (!isAdmin == "admin") res.json("Authorization Error");

  var promise = Category.updateMany(
    {},
    {
      $push: {
        updatedCategories: { topCategory: categoryName, bottomCategory: "" },
      },
    }
  );

  promise.then((doc) => res.json("success")).catch((err) => res.json(err));
});

router.post("/update_top_category", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;
  var categoryName = data.categoryName;
  var topCategory = data.topCategory;

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Category.update(
    {
      "updatedCategories.topCategory": topCategory,
      "updatedCategories.bottomCategory": "",
    },
    {
      $set: {
        "updatedCategories.$.topCategory": categoryName,
      },
    }
  );

  promise.then((doc) => {
    var promise2 = Category.updateMany(
      {
        "updatedCategories.topCategory": topCategory,
      },
      {
        $set: {
          "updatedCategories.$.topCategory": categoryName,
        },
      },
      {
        upsert: true,
      }
    );

    promise2.then((doc) => {
      res.json("success");
    });
  });
});

router.post("/update_bottom_category", jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var data = req.body.data;

  var categoryName = data.categoryName;
  var bottomCategory = data.bottomCategory;
  var topCategory = data.topCategory;

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Category.update(
    {
      "updatedCategories.bottomCategory": bottomCategory,
      "updatedCategories.topCategory": topCategory,
    },
    {
      $set: {
        "updatedCategories.$.bottomCategory": categoryName,
      },
    }
  );

  promise.then((doc) => res.json("success"));
});

router.post("/add_bottom_category", jsonParser, (req, res) => {
  var data = req.body.data;
  var topCategory = data.topCategory;
  var bottomCategory = data.bottomCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Category.updateMany(
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

  promise.then((doc) => res.json(doc));
});

router.post("/delete_top_category", jsonParser, (req, res) => {
  var data = req.body.data;
  var topCategory = data.topCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Category.update(
    { "updatedCategories.topCategory": topCategory },
    {
      $pull: {
        updatedCategories: {
          topCategory: topCategory,
        },
      },
    }
  );

  promise.then((doc) => res.json("success"));
});

router.post("/delete_bottom_category", jsonParser, (req, res) => {
  var data = req.body.data;
  var bottomCategory = data.bottomCategory;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  var promise = Category.update(
    { "updatedCategories.bottomCategory": bottomCategory },
    {
      $pull: {
        updatedCategories: {
          bottomCategory: bottomCategory,
        },
      },
    }
  );

  promise.then((doc) => res.json(doc));
});

router.post("/upload_image", jsonParser, (req, res) => {
  var img = req.files.file;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authentication Error");

  fs.writeFile("./images/" + img.name, img.data, "binary", (err) => {
    if (err) throw err;
    console.log("File saved.");
    res.json("success");
  });
});

module.exports = router;
