const express = require("express");
const router = express.Router();
const Users = require("../Models/users");
const User = Users.User;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const { decodeCookie } = require("../helpers/decode-cookie");

router.get("/users", (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);
  var userArr = [];
  var query = User.find();

  query.exec((err, users) => {
    if (err) res.json(err);
    if (users == null) res.json("Error");

    res.json(users);
  });
});

router.get("/user", (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  var promise = User.find({ email: email });

  promise.then((doc) => res.json(doc.pop()));
});

router.post("/user_by_id", jsonParser, (req, res) => {
  var userData = req.body.data;

  var promise = User.find({ _id: userData.id });

  promise.then((doc) => res.json(doc.pop()));
});

router.post("/update_user_profile", jsonParser, (req, res) => {
  var userData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authorization Error");
  let userRole = String(userData.userRole).toLowerCase();

  var query = { email: userData.email };
  var update = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    phone: userData.phone,
    address: userData.address,
    userRole: userRole,
    defaultLang: userData.defaultLang,
  };

  var options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    useFindAndModify: false,
  };

  User.findOneAndUpdate(query, update, options, (err, result) => {
    if (err) res.json(err);

    res.json(result);
  });
});

router.post("/create_new_user", jsonParser, (req, res) => {
  var userData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authorization Error");

  var User = new Users.User({
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    address: userData.address,
    password: userData.password,
    userRole: String(userData.userRole).toLowerCase(),
    defaultLang: userData.defaultLang,
  });

  User.save()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.post("/delete_user", jsonParser, (req, res) => {
  var userData = req.body.data;
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere);

  if (!isAdmin == "admin") res.json("Authorization Error");

  User.findOneAndDelete({ _id: userData.id })
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

module.exports = router;
