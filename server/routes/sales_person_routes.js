require('dotenv').config({
  path: 'variables.env'
})

var express = require('express')
var router = express.Router()

var Users = require('../Models/users')
var Leads = require('../Models/leads')
var Customers = require('../Models/customers')
var SalesPersons = require('../Models/salespersons')

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var _ = require('underscore')
var CryptoJS = require('crypto-js')
var fs = require('fs')

router.post('/sales_register1', jsonParser, function (req, res) {
  var userData = req.body.data

  if (!userData.fullName) {
    res.json("Full Name must provided")
  } else if (userData.password != userData.passwordRepeat) {
     res.json("Passwords should match")
  } else {

  var SalesPerson = new SalesPersons.SalesPerson({
    fullname: userData.fullName,
    email: userData.email,
    password: userData.passwordd,
    isVerified: false
  })

  var promise = SalesPerson.save()

  promise.then(function (doc) {
    var token = CryptoJS.AES.encrypt(String(userData.email), String(process.env.JWT_SECRET)).toString()
    res.cookie('nexusweb', token, { maxAge: 90000000 })
    res.json(doc)
  })
  }
})

router.post('/sales_register2', jsonParser, function (req, res) {
  var userData = req.body.data

  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  console.log(userData)

  SalesPersons.SalesPerson.updateOne({ email: email },
    {
      businessName: userData.businessname,
      dbaName: userData.dbaName,
      primaryPhone: userData.primaryPhone,
      cellPhone: userData.cellPhone,
      dealershipType: userData.dealershipType
    }, {}, cb)

  function cb (err, doc) {
    if (err) console.log(err)
    console.log(doc)
    res.json('success')
  }
 })

router.post('/sales_register3', jsonParser, function (req, res) {
  var userData = req.body.data

  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  if (userData.length == 0) {
    res.json('error')
  } else  {
    SalesPersons.SalesPerson.updateOne({ email: email },
      {
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zipCode: userData.zipCode,
        licenseNumber: userData.licenseNumber,
        taxNumber: userData.taxNumber
      }, {}, cb)

    function cb (err, doc) {
      if (err) console.log(err)
      console.log(doc)
      res.json('success')
    }
  }
})

router.post('/sales_register4', jsonParser, function (req, res) {
  var userData = req.body
  var token = ''
  console.log(req.body)
  console.log(req.files)

  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  if (req.files.file && req.files.file2) {
    userData.file2 = req.files.file2
    userData.file = req.files.file
    userData.file2.img_type = '.' + userData.file2.mimetype.split('/')[1]
    userData.file.img_type = '.' + userData.file.mimetype.split('/')[1]
    if (userData.file.mimetype == 'image/jpeg' || userData.file.mimetype == 'image/png' || userData.file.mimetype == 'image/gif') {
      if (userData.file2.mimetype == 'image/jpeg' || userData.file2.mimetype == 'image/png' || userData.file2.mimetype == 'image/gif') {
        SalesPersons.SalesPerson.updateOne({ email: email },
          {
            signature: userData.signature,
            file1name: userData.file.md5 + userData.file.img_type,
            file2name: userData.file2.md5 + userData.file2.img_type
          }, {}, cb)
        function cb (err, doc) {
          if (err) console.log(err)

          fs.writeFile('./images/' + userData.file.md5 + userData.file.img_type, userData.file.data, 'binary', function (err) {
            if (err) throw err
            console.log('File saved.')
            fs.writeFile('./images/' + userData.file2.md5 + userData.file.img_type, userData.file2.data, 'binary', function (err) {
              if (err) throw err
              console.log('File saved.')
              res.cookie('nexusweb', token, { maxAge: 0})
              res.json('success')
            })
          })
        }
      } else {
        res.json('File 2 should be jpeg, png or gif')
      }
    } else {
      res.json('File 1 should be jpeg, png or gif')
    }
  } else {
    res.json('File 1 and File 2 should be uploaded')
  }
})

router.get('/salespersons', function (req, res, next) {
  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  Users.User.findOne({ email: email }, function (err, user) {
    if (err) console.log(err)
    if (user) {
      if (user.is_admin) {
        SalesPersons.SalesPerson.find({ isVerified: false }, function (err, salespersons) {
          if (err) console.log(err)
          res.json(salespersons)
        })
      } 
    } else {
      res.json("Error")
      next()
    }
  })
})

router.get('/salespersons/:id', jsonParser, function (req, res) {
  var id = req.params.id
  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)

  Users.User.findOne({ email: email }, function (err, user) {
    if (err) console.log(err)
    if (user.is_admin) {
      SalesPersons.SalesPerson.find({ _id: id }, function (err, salesperson) {
        if (err) console.log(err)
        res.json(salesperson)
      })
    }
  })
})

router.post('/verify_salesperson', jsonParser, function (req, res) {
  var data = req.body.data
  var email = CryptoJS.AES.decrypt(String(req.cookies.nexusweb), String(process.env.JWT_SECRET)).toString(CryptoJS.enc.Utf8)
  Users.User.findOne({ email: email }, function (err, user) {
    if (err) console.log(err)
    if (user.is_admin) {
      SalesPersons.SalesPerson.findOneAndUpdate({ _id: data.id },
        {
          isVerified: true
        }, {}, cb)

      function cb (err, doc) {
        if (err) console.log(err)
        console.log(doc)
        var User = new Users.User({
          fullName: doc.fullname,
          email: doc.email,
          password: doc.password,
          address: doc.address,
          city: doc.city,
          state: doc.state,
          phone: doc.primaryPhone
        })

        var promise = User.save()

        promise.then(function (doc) {
          res.json('success')
        })
      }
    }
  })
})

module.exports = router
