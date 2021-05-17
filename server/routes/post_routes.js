const express = require('express')
const router = express.Router()
const ba64 = require('ba64')

const Posts = require('../Models/posts')
const Post = Posts.Post

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')

router.post('/get_posts', jsonParser, (req, res) => {
  Post.find({})
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/create_post', jsonParser, (req, res) => {
  const postData = req.body
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer')
    res.json('Authentication Error')

  Post.find({})
    .then(posts => {
      const postOrder = posts.length
      const Post = new Posts.Post({
        owner: postData.owner,
        ownerEmail: email,
        content: postData.editorData,
        categories: postData.categories,
        postTitle: postData.postTitle.toLowerCase(),
        topic: postData.topic,
        postImage: postData.fileName + '.jpeg',
        postKeywords: postData.postKeywords,
        postCustomUrl: postData.postCustomUrl,
        postSeoWords: postData.postSeoWords,
        postSeoUrl: postData.postSeoUrl,
        postSeoHeader: postData.postSeoHeader,
        publishDate: postData.publishDate,
        publishHour: postData.publishHour,
        postEnglishLink: postData.postEnglishLink,
        postArabicLink: postData.postArabicLink,
        postRussianLink: postData.postRussianLink,
        postUkranianLink: postData.postUkranianLink,
        postFrenchLink: postData.postFrenchLink,
        postLanguage: postData.postLanguage,
        tags: postData.selectedTags,
        state: postData.state,
        postOrder: postOrder,
        views: 0,
        logs: [
          {
            editor: email,
            editDate: Date.now(),
            editText: 'Post created'
          }
        ],
        isDraft: postData.saveAsDraft,
        isLocked: false
      })

      ba64.writeImage('./images/' + postData.fileName, postData.file, err => {
        if (err) res.json(err)

        console.log('Post Image saved successfully')

        Post.save()
          .then(post => res.json('success'))
          .catch(err => res.json(err))
      })
    })
    .catch(err => res.json(err))
})

router.post('/post_by_id', jsonParser, (req, res) => {
  const postData = req.body.data
  const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$')

  if (!checkForHexRegExp.test(postData.id)) res.json('Not and Id')

  const promise = Post.findOneAndUpdate(
    { _id: postData.id },
    { $inc: { views: 1 } }
  )

  promise
    .then(doc => {
      Post.find({ _id: postData.id }).then(doc2 => {
        res.json(doc2.pop())
      })
    })
    .catch(err => {
      res.json('Not an Id')
    })
})

router.post('/post_by_title', jsonParser, (req, res) => {
  const postData = req.body.data2

  const promise = Post.findOneAndUpdate(
    { postTitle: postData.postTitle },
    { $inc: { views: 1 } }
  )

  promise
    .then(doc => {
      Post.find({ postTitle: postData.postTitle }).then(doc2 =>
        res.json(doc2.pop())
      )
    })
    .catch(err => res.json(err))
})

router.post('/update_post', jsonParser, (req, res) => {
  const postData = req.body
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  Post.updateOne(
    { _id: postData.id },
    {
      $addToSet: {
        logs: {
          editor: email,
          editDate: Date.now(),
          editText: postData.latestLogText
        }
      },
      owner: postData.owner,
      ownerEmail: postData.ownerEmail,
      content: postData.editorData,
      categories: postData.categories,
      postTitle: postData.postTitle.toLowerCase(),
      topic: postData.topic,
      postImage: postData.fileName + '.jpeg',
      postKeywords: postData.postKeywords,
      postCustomUrl: postData.postCustomUrl,
      postSeoWords: postData.postSeoWords,
      postSeoUrl: postData.postSeoUrl,
      postSeoHeader: postData.postSeoHeader,
      postLanguage: postData.postLanguage,
      publishDate: postData.publishDate,
      publishHour: postData.publishHour,
      postEnglishLink: postData.postEnglishLink || '',
      postArabicLink: postData.postArabicLink || '',
      postRussianLink: postData.postRussianLink || '',
      postUkranianLink: postData.postUkranianLink || '',
      postFrenchLink: postData.postFrenchLink || '',
      state: postData.state,
      isDraft: postData.saveAsDraft || false
    }
  ).then(doc => {
    ba64.writeImage('./images/' + postData.fileName, postData.file, err => {
      if (err) res.json(err)

      console.log('Post Image saved successfully')

      res.json(doc)
    })
  })
})

router.post('/edit_post_log', jsonParser, (req, res) => {
  const logData = req.body.data
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  Post.updateOne(
    { 'logs._id': logData._id },
    {
      $set: {
        'logs.$.editor': email,
        'logs.$.editDate': Date.now(),
        'logs.$.editText': logData.editText
      }
    }
  ).then(doc => res.json('success'))
})

router.post('/delete_post_log', jsonParser, (req, res) => {
  const logData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  Post.updateOne(
    { 'logs._id': logData.id },
    {
      $pull: {
        logs: {
          _id: logData.id
        }
      }
    }
  ).then(doc => res.json('success'))
})

router.post('/lock_post', jsonParser, (req, res) => {
  const postData = req.body.data
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor')
    res.json('Authentication Error')

  Post.updateOne(
    { _id: postData.id },
    {
      isLocked: true,
      lockerEditor: email
    }
  ).then(doc => res.json(doc))
})

router.post('/unlock_post', jsonParser, (req, res) => {
  const postData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor')
    res.json('Authentication Error')

  Post.updateOne(
    { _id: postData.id },
    {
      isLocked: false,
      lockerEditor: ''
    }
  ).then(doc => res.json('success'))
})

router.post('/delete_post', jsonParser, (req, res) => {
  const postData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const promise = Post.findOneAndDelete({ _id: postData.id })

  promise.then(doc => res.json('success'))
})

module.exports = router
