require('dotenv').config({
  path: 'variables.env'
})

var express = require('express')
var router = express.Router()

var Users = require('../Models/users')
var Quotes = require('../Models/quotes')
var Customers = require('../Models/customers')
var Orders = require('../Models/orders')
var Tickets = require('../Models/tickets')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var _ = require('underscore')
var CryptoJS = require('crypto-js')
const { ObjectID } = require('mongodb')
var axios = require('axios')


router.post('/get_tickets', jsonParser, function (req, res) {
  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Tickets.Ticket.find({ ownerEmail: email })

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})


router.post('/create_ticket', jsonParser, function (req, res) {
  var orderData = req.body.data
  console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {

    var Ticket = new Tickets.Ticket({
      owner: doc[0]._id,
      ownerEmail: doc[0].email,
      quote: orderData.quoteId,
      topic: orderData.topic,
      state: 'open'
    })

    Ticket.messages.push({text: orderData.message, owner: doc[0]._id})

    var promise2 = Ticket.save()

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/get_ticket', jsonParser, function (req, res) {
  var orderData = req.body.data

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then(function (doc) {
    var promise2 = Tickets.Ticket.findOne({ _id: orderData.id }).populate('messages')

    promise2.then(function (doc2) {
      res.json(doc2)
    })
  })
})

router.post('/delete_ticket', jsonParser, function (req, res) {
  var ticketData = req.body.data
  console.log(req.body)

  var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  var promise = Users.User.find({ email: email })

  promise.then((doc) => {
    Tickets.Ticket.deleteOne({_id: ticketData.id}).then( (result) => {
        res.json(result)
    })
  })
})

router.post('/add_message', jsonParser, function (req, res) {
  var ticketData = req.body.data
  if (ticketData.message.length < 2) {
    res.json("Text must be 2 chars or more")
  } else {
    var email = CryptoJS.AES.decrypt(req.cookies.nexusweb, String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

    var promise = Users.User.find({ email: email })

    promise.then(doc => {
      var message = {}

      message.text = ticketData.message
      message.owner = doc[0]._id

      Tickets.Ticket.findOneAndUpdate({_id: ticketData.id}, { $push: { messages: message}}).then(doc2 => {
        res.json(doc2)
      })
    })
  }
})

module.exports = router