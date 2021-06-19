const express = require('express')
const router = express.Router()

const Activities = require('../Models/activities')
const Activity = Activities.Activity
const ba64 = require('ba64')
const fs = require('fs')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')
const { uploadFile } = require('../helpers/s3')

router.post('/get_activities', jsonParser, (req, res) => {
  const promise = Activity.find({})

  promise.then(doc => res.json(doc)).catch(err => res.json(err))
})

router.post('/get_activity', jsonParser, (req, res) => {
  const activityData = req.body.data

  Activity.find({ _id: activityData.id }).then(doc => res.json(doc.pop()))
})

router.post('/create_activity', jsonParser, (req, res) => {
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  const data = req.body // form data

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authorization Error')
  }

  const Activity = new Activities.Activity({
    owner: data.owner,
    ownerEmail: email,
    activityTitle: data.activityTitle,
    activityType: data.activityType,
    status: 'unconfirmed',
    activityImage: data.fileName,
    startDate: data.startDate,
    endDate: data.endDate,
    activityText: data.activityText,
    activityLanguage: data.activityLanguage,
    activityLink: data.activityLink,
    visible: data.visible || false
  })

  ba64.writeImage('./images/' + data.fileName, data.file, err => {
    if (err) throw err
    uploadFile(data.fileName)
      .then(data => console.log(data))
      .catch(err => console.log('ERROR ------------ \n', err))

    console.log('Activity Image saved successfully')

    fs.unlink('./images/' + data.fileName + '.jpeg', err => {
      if (err) console.log(err)
      else {
        console.log('\nDeleted file: ', data.fileName)
      }
    })

    Activity.save()
      .then(activity => res.json('success'))
      .catch(err => res.json(err))
  })
})

router.post('/update_activity', jsonParser, (req, res) => {
  const activityData = req.body
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  Activity.updateOne(
    { _id: activityData.id },
    {
      activityTitle: activityData.activityTitle,
      activityType: activityData.activityType,
      status: activityData.status,
      activityImage: activityData.fileName,
      startDate: activityData.startDate,
      endDate: activityData.endDate,
      visible: activityData.visible,
      activityText: activityData.activityText,
      activityLanguage: activityData.activityLanguage,
      activityLink: activityData.activityLink
    }
  ).then(doc => {
    ba64.writeImage(
      './images/' + activityData.fileName,
      activityData.file,
      err => {
        if (err) res.json(err)

        console.log('Activity Image saved successfully')
        uploadFile(activityData.fileName)
          .then(data => console.log(data))
          .catch(err => console.log('ERROR ------------ \n', err))

        fs.unlink('./images/' + activityData.fileName + '.jpeg', err => {
          if (err) console.log(err)
          else {
            console.log('\nDeleted file: ', activityData.fileName)
          }
        })

        res.json('success')
      }
    )
  })
})

router.post('/confirm_activity', jsonParser, (req, res) => {
  const activityData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Activity.updateOne(
    { _id: activityData.id },
    {
      status: 'confirmed'
    }
  ).then(doc => res.json('success'))
})

router.post('/activity_visible', jsonParser, (req, res) => {
  const activityData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Activity.updateOne(
    { _id: activityData.id },
    {
      visible: true
    }
  ).then(doc => res.json('success'))
})

router.post('/activity_invisible', jsonParser, (req, res) => {
  const activityData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Activity.updateOne(
    { _id: activityData.id },
    {
      visible: false
    }
  ).then(doc => res.json('success'))
})

router.post('/unconfirm_activity', jsonParser, (req, res) => {
  const activityData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor') {
    res.json('Authentication Error')
  }

  Activity.updateOne(
    { _id: activityData.id },
    {
      status: 'unconfirmed'
    }
  ).then(doc => res.json('success'))
})

router.post('/delete_activity', jsonParser, (req, res) => {
  const activityData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Activity.findOneAndDelete({ _id: activityData.id })

  promise.then(doc => res.json('success'))
})

module.exports = router
