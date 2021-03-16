require('dotenv').config({
  path: 'variables.env'
})

var express = require('express')
var router = express.Router()

var Users = require('../Models/users')
var Leads = require('../Models/leads')
var Customers = require('../Models/customers')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var _ = require('underscore')
var CryptoJS = require('crypto-js')
const { ObjectID } = require('mongodb')

router.post('/get_leads', jsonParser, function (req, res) {
  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Leads.Lead.find({ owner: doc[0]._id })

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/get_lead_by_source', jsonParser, function (req, res) {
  var leadData = req.body
  // console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Leads.Lead.find({ owner: doc[0]._id, from: leadData.from })

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/get_lead_by_destination', jsonParser, function (req, res) {
  var leadData = req.body
  // console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Leads.Lead.find({ owner: doc[0]._id, to: leadData.to })

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/get_lead_by_vin', jsonParser, function (req, res) {
  var leadData = req.body
  // console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Leads.Lead.find({ owner: doc[0]._id, vin: leadData.vin })

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/create_lead', jsonParser, function (req, res) {
  var leadData = req.body.data
  console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var Lead = new Leads.Lead({
      owner: doc[0]._id,
      to: leadData.to,
      from: leadData.from,
      vin: leadData.vin,
      notes: leadData.notes,
      cost: leadData.cost,
      move_date: leadData.move_date
    })

    var promise2 = Lead.save()

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

module.exports = router
