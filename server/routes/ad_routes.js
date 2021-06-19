const express = require('express')
const router = express.Router()

const Ads = require('../Models/ads')
const Ad = Ads.Ad
const ba64 = require('ba64')
const fs = require('fs')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')
const { uploadFile } = require('../helpers/s3')

router.post('/get_ads', jsonParser, (req, res) => {
  const promise = Ad.find({})

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ads_top_most', jsonParser, (req, res) => {
  const promise = Ad.find({ adLocation: 'Ana Sayfa En Üst' }).limit(3)

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ads_top', jsonParser, (req, res) => {
  const promise = Ad.find({ adLocation: 'Ana Sayfa Üst' }).limit(3)

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ads_middle', jsonParser, (req, res) => {
  const promise = Ad.find({ adLocation: 'Ana Sayfa Orta' }).limit(3)

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ads_bottom', jsonParser, (req, res) => {
  const promise = Ad.find({ adLocation: 'Ana Sayfa Alt' }).limit(3)

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ads_roportaj', jsonParser, (req, res) => {
  const promise = Ad.find({ adType: 'Röportaj' }).limit(5)

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_ad', jsonParser, (req, res) => {
  const adData = req.body.data

  Ad.findOneAndUpdate({ _id: adData.id }, { $inc: { views: 1 } })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      if (err) res.json('Server Error')
    })
})

router.post('/click_ad', jsonParser, (req, res) => {
  const adData = req.body.data

  Ad.findOneAndUpdate({ _id: adData.id }, { $inc: { clicks: 1 } })
    .then(doc => {
      res.json('success')
    })
    .catch(err => {
      if (err) res.json('Server Error')
    })
})

router.post('/create_ad', jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body // form data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  const Ad = new Ads.Ad({
    owner: data.owner,
    ownerEmail: email,
    adTitle: data.adName,
    adType: data.adType,
    adName: data.adName,
    adLanguage: data.adLanguage,
    adLocation: data.adLocation,
    link: data.link,
    status: 'unconfirmed',
    adImage: data.fileName
  })

  ba64.writeImage('./images/' + data.fileName, data.file, err => {
    if (err) throw err

    console.log('Ad Image saved successfully')
    uploadFile(data.fileName)
      .then(data => console.log(data))
      .catch(err => console.log('ERROR ------------ \n', err))

    fs.unlink('./images/' + data.fileName + '.jpeg', err => {
      if (err) console.log(err)
      else {
        console.log('\nDeleted file: ', data.fileName)
      }
    })

    Ad.save()
      .then(ad => res.json('success'))
      .catch(err => res.json(err))
  })
})

router.post('/update_ad', jsonParser, (req, res) => {
  const adData = req.body
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  Ad.updateOne(
    { _id: adData.id },
    {
      adTitle: adData.adTitle,
      adName: adData.adName || adData.adTitle,
      adType: adData.adType,
      status: adData.status,
      adLanguage: adData.adLanguage,
      adImage: adData.fileName,
      adLocation: adData.adLocation,
      link: adData.adLink
    }
  )
    .then(doc => {
      if (adData.file !== null && adData.file !== 'null') {
        ba64.writeImage('./images/' + adData.fileName, adData.file, err => {
          if (err) res.json(err)

          uploadFile(adData.fileName)
            .then(data => console.log(data))
            .catch(err => console.log('ERROR ------------ \n', err))
          console.log('Ad Image saved successfully')

          fs.unlink('./images/' + adData.fileName + '.jpeg', err => {
            if (err) console.log(err)
            else {
              console.log('\nDeleted file: ', adData.fileName)
            }
          })
          res.json('success')
        })
      } else if (adData.file === 'null') {
        res.json('success')
      }
    })
    .catch(err => {
      if (err) res.json(err)
    })
})

router.post('/confirm_ad', jsonParser, (req, res) => {
  const data = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Ad.updateOne(
    { _id: data.id },
    {
      status: 'confirmed'
    }
  ).then(doc => res.json('success'))
})

router.post('/unconfirm_ad', jsonParser, (req, res) => {
  const data = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Ad.updateOne(
    { _id: data.id },
    {
      status: 'unconfirmed'
    }
  ).then(doc => res.json('success'))
})

router.post('/delete_ad', jsonParser, (req, res) => {
  const adData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Ad.findOneAndDelete({ _id: adData.id })

  promise.then(doc => res.json('success'))
})

module.exports = router
