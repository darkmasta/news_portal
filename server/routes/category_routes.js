const express = require('express')
const router = express.Router()

const Categories = require('../Models/categories')
const Category = Categories.Category

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const fs = require('fs')
const { decodeCookie } = require('../helpers/decode-cookie')

router.post('/get_categories', jsonParser, (req, res) => {
  const promise = Category.find({})

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/add_top_category', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  const categoryName = data.categoryName
  const categoryColor = data.topCategoryColor

  if (!isAdmin === 'admin') res.json('Authorization Error')

  const promise = Category.updateMany(
    {},
    {
      $push: {
        updatedCategories: {
          topCategory: categoryName,
          bottomCategory: '',
          topColor: categoryColor
        }
      }
    }
  )

  promise.then(doc => res.json('success')).catch(err => res.json(err))
})

router.post('/update_top_category', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data
  const categoryName = data.categoryName
  const categoryColor = data.topCategoryColor
  const topCategory = data.topCategory

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Category.update(
    {
      'updatedCategories.topCategory': topCategory,
      'updatedCategories.bottomCategory': ''
    },
    {
      $set: {
        'updatedCategories.$.topCategory': categoryName,
        'updatedCategories.$.topColor': categoryColor
      }
    }
  )

  promise.then(doc => {
    const promise2 = Category.updateMany(
      {
        'updatedCategories.topCategory': topCategory
      },
      {
        $set: {
          'updatedCategories.$.topCategory': categoryName,
          'updatedCategories.$.topColor': categoryColor
        }
      },
      {
        upsert: true
      }
    )

    promise2.then(doc => {
      res.json('success')
    })
  })
})

router.post('/update_bottom_category', jsonParser, (req, res) => {
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body.data

  const categoryName = data.categoryName
  const bottomCategory = data.bottomCategory
  const categoryColor = data.categoryColor

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Category.findOneAndUpdate(
    {
      'updatedCategories.bottomCategory': bottomCategory
    },
    {
      $set: {
        'updatedCategories.$.bottomCategory': categoryName,
        'updatedCategories.$.color': categoryColor
      }
    }
  )

  promise.then(doc => res.json('success'))
})

router.post('/add_bottom_category', jsonParser, (req, res) => {
  const data = req.body.data
  const topCategory = data.topCategory
  const bottomCategory = data.bottomCategory
  const categoryColor = data.categoryColor
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Category.updateMany(
    {},
    {
      $push: {
        updatedCategories: {
          topCategory: topCategory,
          bottomCategory: bottomCategory,
          color: categoryColor
        }
      }
    }
  )

  promise.then(doc => res.json(doc))
})

router.post('/delete_top_category', jsonParser, (req, res) => {
  const data = req.body.data
  const topCategory = data.topCategory
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Category.update(
    { 'updatedCategories.topCategory': topCategory },
    {
      $pull: {
        updatedCategories: {
          topCategory: topCategory
        }
      }
    }
  )

  promise.then(doc => res.json('success'))
})

router.post('/delete_bottom_category', jsonParser, (req, res) => {
  const data = req.body.data
  const bottomCategory = data.bottomCategory
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Category.update(
    { 'updatedCategories.bottomCategory': bottomCategory },
    {
      $pull: {
        updatedCategories: {
          bottomCategory: bottomCategory
        }
      }
    }
  )

  promise.then(doc => res.json(doc))
})

router.post('/upload_image', jsonParser, (req, res) => {
  const img = req.files.file
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  fs.writeFile('./images/' + img.name, img.data, 'binary', err => {
    if (err) throw err
    console.log('File saved.')
    res.json('success')
  })
})

module.exports = router
