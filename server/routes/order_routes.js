require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Users = require("../Models/users");
var Quotes = require("../Models/quotes");
var Customers = require("../Models/customers");
var Orders = require("../Models/orders");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
const { ObjectID } = require("mongodb");
var axios = require("axios");
var mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});
var MailComposer = require("nodemailer/lib/mail-composer");

router.get("/get_orders", jsonParser, function (req, res) {
  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Orders.Order.find({ owner: doc[0]._id }).populate("quote");

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/get_order", jsonParser, function (req, res) {
  var orderData = req.body.data;

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var promise2 = Orders.Order.findOne({ _id: orderData.id }).populate(
      "quote"
    );

    promise2.then(function (doc2) {
      res.json(doc2);
    });
  });
});

router.post("/create_order", jsonParser, function (req, res) {
  var orderData = req.body.data;
  console.log(req.body);

  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ email: email });

  promise.then(function (doc) {
    var Order = new Orders.Order({
      owner: doc[0]._id,
      ownerEmail: orderData.ownerEmail,
      cost: Number(orderData.cost),
      profit: Number(orderData.profit),
      quoteId: orderData.quoteId,
      shipperInfo: {
        shipper: orderData.shipperInfo.shipper,
        email: orderData.shipperInfo.email,
        address1: orderData.shipperInfo.address1,
        address2: orderData.shipperInfo.address2,
        firstName: orderData.shipperInfo.firstName,
        lastName: orderData.shipperInfo.lastName,
        phone: orderData.shipperInfo.phone,
        mobile: orderData.shipperInfo.mobile,
        city: orderData.shipperInfo.city,
        zip: orderData.shipperInfo.zip,
        company: orderData.shipperInfo.company,
      },
      pickupInfo: {
        address1: orderData.pickupInfo.address1,
        address2: orderData.pickupInfo.address2,
        contact: orderData.pickupInfo.contact,
        phone: orderData.pickupInfo.phone,
        mobile: orderData.pickupInfo.mobile,
        city: orderData.pickupInfo.city,
        zip: orderData.pickupInfo.zip,
        buyerNumber: orderData.pickupInfo.buyerNumber,
        company: orderData.pickupInfo.company,
      },
      deliveryInfo: {
        address1: orderData.deliveryInfo.address1,
        address2: orderData.deliveryInfo.address2,
        contact: orderData.deliveryInfo.contact,
        phone: orderData.deliveryInfo.phone,
        mobile: orderData.deliveryInfo.mobile,
        city: orderData.deliveryInfo.city,
        zip: orderData.deliveryInfo.zip,
        buyerNumber: orderData.deliveryInfo.buyerNumber,
        company: orderData.deliveryInfo.company,
      },
    });

    var promise2 = Order.save();

    promise2.then(function (doc2) {
      res.json(doc2);
      /*
      var data = {
        from: "test@dealers.nexusautotransport.com",
        to: "matt@nexusautotransport.com",
        subject: "New Order Created",
        text: "asd",
        html:
          '<a href="' +
          "http://dealers.nexusautotransport.com:5000/#/orders/" +
          doc2._id +
          '">' +
          "<b>View Order Details</b>" +
          "</a>",
      };

      var mail = new MailComposer(data);

      mail.compile().build((err, message) => {
        var dataToSend = {
          to: "matt@nexusautotransport.com",
          message: message.toString("ascii"),
        };

        mailgun.messages().sendMime(dataToSend, (sendError, body) => {
          if (sendError) {
            console.log(sendError);
            return;
          }
          console.log(body);
          res.json(doc2);
        });
      });
      */
    });
  });
});

router.post("/update_order", jsonParser, function (req, res) {
  var orderData = req.body.data;
  var email = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var query = { _id: orderData.id };
  var update = {
    owner: orderData.owner,
    ownerEmail: orderData.ownerEmail,
    cost: Number(orderData.cost),
    profit: Number(orderData.profit),
    shipperInfo: {
      shipper: orderData.shipperInfo.shipper,
      email: orderData.shipperInfo.email,
      address1: orderData.shipperInfo.address1,
      address2: orderData.shipperInfo.address2,
      firstName: orderData.shipperInfo.firstName,
      lastName: orderData.shipperInfo.lastName,
      phone: orderData.shipperInfo.phone,
      mobile: orderData.shipperInfo.mobile,
      city: orderData.shipperInfo.city,
      zip: orderData.shipperInfo.zip,
      company: orderData.shipperInfo.company,
    },
    pickupInfo: {
      address1: orderData.pickupInfo.address1,
      address2: orderData.pickupInfo.address2,
      contact: orderData.pickupInfo.contact,
      phone: orderData.pickupInfo.phone,
      mobile: orderData.pickupInfo.mobile,
      city: orderData.pickupInfo.city,
      zip: orderData.pickupInfo.zip,
      buyerNumber: orderData.pickupInfo.buyerNumber,
      company: orderData.pickupInfo.company,
    },
    deliveryInfo: {
      address1: orderData.deliveryInfo.address1,
      address2: orderData.deliveryInfo.address2,
      contact: orderData.deliveryInfo.contact,
      phone: orderData.deliveryInfo.phone,
      mobile: orderData.deliveryInfo.mobile,
      city: orderData.deliveryInfo.city,
      zip: orderData.deliveryInfo.zip,
      buyerNumber: orderData.deliveryInfo.buyerNumber,
      company: orderData.deliveryInfo.company,
    },
    quotes: [],
  };

  orderData.quotes.forEach((quote) => {
    update.quotes.push({ _id: quote._id });
  });

  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Orders.Order.findOneAndUpdate(query, update, options, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.json(result);
  });
});

module.exports = router;
