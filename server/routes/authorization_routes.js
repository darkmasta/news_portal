const express = require('express')
const router = express.Router()

const Users = require('../Models/users')
const User = Users.User

const CryptoJS = require('crypto-js')

router.get('/success', (req, res) => {
  const query = User.findOne({ email: req.user.email })

  query.exec((err, user) => {
    if (err) {
      return handleError(err)
    }
    if (user == null) {
      // email not found
      res.json('Error signing in')
    } else {
      req.user.data = user

      User.findByIdAndUpdate(
        { _id: user._id },
        { lastLogin: Date.now() },
        (err, data) => {
          let encryptData = req.user.email

          encryptData += '~'
          encryptData += user.userRole

          var token = CryptoJS.AES.encrypt(
            String(encryptData),
            String(process.env.JWT_SECRET)
          ).toString()

          res.cookie('defensehere', token, { maxAge: 90000000 })
          res.json('success')
        }
      )
    }
  })
})

router.get('/fail', (req, res) => {
  res.json('Error signing in')
})

module.exports = router
