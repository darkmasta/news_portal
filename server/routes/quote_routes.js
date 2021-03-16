require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");
var Quotes = require("../Models/quotes");
var Customers = require("../Models/customers");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
const { ObjectID } = require("mongodb");
var axios = require("axios");

router.post("/get_quotes", jsonParser, function (req, res) {
  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Quotes.Quote.find({ owner: doc[0]._id });

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/decode_zip", jsonParser, function (req, res) {
  var data = req.body.data;
  console.log(data.zipCode);
  axios
    .get("https://ziptasticapi.com/" + data.zipCode)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error.data);
    });
});

router.post("/get_quote", jsonParser, function (req, res) {
  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Quotes.Quote.find({ owner: doc[0]._id });

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/get_quote_by_id", jsonParser, function (req, res) {
  var data = req.body.data;

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Quotes.Quote.find({ _id: data.id });

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/get_lead_by_destination", jsonParser, function (req, res) {
  var leadData = req.body;
  // console.log(req.body)

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Quotes.Quote.find({ owner: doc[0]._id, to: leadData.to });

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/get_lead_by_vin", jsonParser, function (req, res) {
  var leadData = req.body;
  // console.log(req.body)

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Quotes.Quote.find({ owner: doc[0]._id, vin: leadData.vin });

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/create_quote", jsonParser, function (req, res) {
  var quoteData = req.body.data;
  console.log(req.body);

  var carArrayData = [{}];
  quoteData.cars.forEach((car) => {
    carArrayData.push({
      price: car.price,
      profit: car.profit,
      vin: car.vin,
      year: car.year,
      make: car.make,
      model: car.model,
    });
  });

  carArrayData.shift();

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var Quote = new Quotes.Quote({
      owner: doc[0]._id,
      ownerEmail: doc[0].email,
      customer: quoteData.customer,
      cars: carArrayData,
      originCity: quoteData.city,
      originState: quoteData.state,
      originZipCode: quoteData.zipCode,
      destinationAddress: quoteData.destinationAddress,
      destinationCity: quoteData.destinationCity,
      destinationState: quoteData.destinationState,
      destinationZipCode: quoteData.destinationZipCode,
      notes: quoteData.notes,
    });

    var promise2 = Quote.save();

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/update_quote", jsonParser, function (req, res) {
  var quoteData = req.body.data;

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var carArrayData = [{}];
  quoteData.cars.forEach((car) => {
    carArrayData.push({
      price: car.price,
      margin: car.margin,
      vin: car.vin,
      year: car.year,
      make: car.make,
      model: car.model,
    });
  });
  carArrayData.shift();

  console.log(carArrayData);
  console.log(quoteData);

  var query = { _id: quoteData.id };
  var update = {
    originCity: quoteData.city,
    originState: quoteData.state,
    cars: carArrayData,
    originZipCode: quoteData.zipCode,
    profit: quoteData.profit,
    notes: quoteData.notes,
    destinationAddress: quoteData.destinationAddress,
    destinationCity: quoteData.destinationCity,
    destinationState: quoteData.destinationState,
    destinationZipCode: quoteData.destinationZipCode,
  };

  var options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    useFindAndModify: false,
  };

  Quotes.Quote.findOneAndUpdate(query, update, options, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
