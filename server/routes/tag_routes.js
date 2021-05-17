const express = require('express')
const router = express.Router()

const Tags = require('../Models/tags')
const Tag = Tags.Tag

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')

router.post('/get_tags', jsonParser, function (req, res) {
  const promise = Tags.Tag.find({})

  promise.then(function (doc) {
    res.json(doc)
  })
})

router.post('/get_tag', jsonParser, (req, res) => {
  const data = req.body.data

  Tag.find({ _id: data.id })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      if (err) res.json('Server Error')
    })
})

router.post('/create_tag', jsonParser, function (req, res) {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  if (!isAdmin === 'admin') res.json('Authorization Error')

  const Tag = new Tags.Tag({
    tagName: data.tagName
  })

  Tag.save()
    .then(tag => res.json('success'))
    .catch(err => res.json(err))
})

router.post('/update_tag', jsonParser, (req, res) => {
  const data = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Tag.updateOne(
    { _id: data.id },
    {
      tagName: data.tagName
    }
  ).then(doc => res.json('success'))
})

router.post('/use_tag', jsonParser, (req, res) => {
  const data = req.body.data

  Tag.findOneAndUpdate({ _id: data.id }, { $inc: { uses: 1 } })
    .then(doc => {
      res.json('success')
    })
    .catch(err => {
      if (err) res.json('Server Error')
    })
})

router.post('/delete_tag', jsonParser, (req, res) => {
  const tagData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Tags.Tag.findOneAndDelete({ _id: tagData.id })

  promise.then(doc => res.json('success'))
})

module.exports = router
