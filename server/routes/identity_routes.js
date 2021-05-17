const express = require('express')
const router = express.Router()

const Identities = require('../Models/identity')
const Identity = Identities.Identity

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')

router.post('/get_identity', jsonParser, (req, res) => {
  const promise = Identity.find({})

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/update_identity', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  Identity.updateMany(
    {},
    {
      kunyeHeading: data.kunyeHeading,
      $set: {
        kunyeImtiyaz: data.kunyeImtiyaz,
        genelYayinYonetmeni: data.genelYayinYonetmeni,
        arabicNews: data.arabicNews,
        englishNews: data.englishNews,
        russianNews: data.russianNews,
        turkishNews: data.turkishNews,
        camera: data.camera,
        postProduction: data.postProduction,
        lawyer: data.lawyer,
        sound: data.sound
      }
    }
  ).then(doc => {
    res.json(doc)
  })
})

router.post('/update_about', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  Identity.updateMany(
    {},
    {
      aboutContent: data.aboutContent
    }
  ).then(doc => {
    res.json('success')
  })
})

router.post('/update_contact', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  Identity.updateMany(
    {},
    {
      contactContent: data.contactContent
    }
  ).then(doc => {
    res.json('success')
  })
})

router.post('/update_activity_type_list', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  Identity.updateMany(
    {},
    {
      $set: {
        activityTypeList: data.activityTypeList
      }
    }
  ).then(doc => {
    res.json('success')
  })
})

module.exports = router
