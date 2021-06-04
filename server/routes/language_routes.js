const express = require('express')
const router = express.Router()

const Translations = require('../Models/translations')
const Translation = Translations.Translation

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs')
const { decodeCookie } = require('../helpers/decode-cookie')

router.post('/get_english', jsonParser, (req, res) => {
  Translation.find({}).then(doc => res.json(doc))
})

router.post('/create_translation', jsonParser, (req, res) => {
  const languageData = req.body.data
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authentication Error')
  }

  const Translation = new Translations.Translation({
    language: languageData.language,
    category: languageData.category,
    text: languageData.text,
    translation: languageData.translation
  })

  Translation.save()
    .then(translation => res.json('success'))
    .catch(err => res.json(err))
})

module.exports = router
