const express = require('express')
const router = express.Router()
const ba64 = require('ba64')
const fs = require('fs')

const Posts = require('../Models/posts')
const Post = Posts.Post

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const { decodeCookie } = require('../helpers/decode-cookie')
const { uploadFile } = require('../helpers/s3')

const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

router.post('/get_posts', jsonParser, (req, res) => {
  // const data = req.body.data
  // const page = req.body.page || 0
  // const perPage = req.body.perPage || 100

  Post.find({})
    // .skip(perPage * page)
    // .limit(perPage)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/get_posts_manset', jsonParser, (req, res) => {
  Post.find({ manset: true })
    .limit(20)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/post_by_category', jsonParser, (req, res) => {
  const postData = req.body.data
  const limit = postData.limit || null

  Post.find({ categories: postData.category })
    .limit(limit)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      if (err) res.json(err)
    })
})

router.post('/posts_other_languages', jsonParser, (req, res) => {
  const postData = req.body.data
  const language = postData.language[0]
  const limit = postData.limit || 7
  const regexText = `/^${language}/`

  Post.find({ postLanguage: { $not: { $regex: regexText } } })
    .limit(limit)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      if (err) res.json(err)
    })
})

router.post('/get_posts_most_read_yesterday', jsonParser, (req, res) => {
  Post.find({
    publishDate: { $lt: new Date(Date.now() - 60 * 60 * 24 * 1000) }
  })
    .sort({ views: 'desc' })
    .limit(5)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/get_posts_most_read_last_week', jsonParser, (req, res) => {
  Post.find({
    publishDate: {
      $lt: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
    }
  })
    .sort({ views: 'desc' })
    .limit(5)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/get_posts_most_read_last_month', jsonParser, (req, res) => {
  Post.find({
    publishDate: {
      $lt: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
    }
  })
    .sort({ views: 'desc' })
    .limit(5)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

router.post('/create_post_interface', jsonParser, (req, res) => {
  const postData = req.body.data

  postData.postTitle = String(postData.postTitle)
    .split('-')
    .join(' ')

  postData.postImage = String(postData.postImage)
    .split('/')
    .pop()

  const Post = new Posts.Post({
    owner: postData.owner,
    ownerEmail: postData.ownerEmail,
    content: postData.content,
    categories: postData.categories,
    postTitle: postData.postTitle.toLowerCase(),
    postImage: postData.postImage,
    postKeywords: postData.postKeywords,
    postCustomUrl: postData.postCustomUrl,
    postSeoUrl: postData.postSeoUrl,
    publishDate: postData.publishDate,
    tags: postData.tags,
    state: postData.state,
    postOrder: postData.postOrder,
    manset: postData.manset,
    views: postData.views || 0,
    isDraft: false,
    isLocked: false
  })

  Post.save()
    .then(post => res.json('success'))
    .catch(err => res.json(err))
})

router.post('/create_post', jsonParser, (req, res) => {
  const postData = req.body
  const { email, isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authentication Error')
  }

  Post.find({})
    .then(posts => {
      const postOrder = posts.length
      const Post = new Posts.Post({
        owner: postData.owner,
        ownerEmail: email,
        content: postData.editorData,
        categories: postData.categories,
        postTitle: postData.postTitle,
        topic: postData.topic,
        postImage: postData.fileName,
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
        sliderImages: postData.sliderImages,
        videoLink: postData.videoLink,
        videoName: postData.videoName,
        manset: postData.manset,
        mobile: postData.mobile,
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

        uploadFile(postData.fileName)
          .then(data => console.log(data))
          .catch(err => console.log('ERROR ------------ \n', err))

        fs.unlink('./images/' + postData.fileName + '.jpeg', err => {
          if (err) console.log(err)
          else {
            console.log('\nDeleted file: ', postData.fileName)
          }
        })

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
      if (err) res.json('Not an Id')
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

router.post('/post_by_seo_url', jsonParser, (req, res) => {
  const postData = req.body.data

  const promise = Post.findOneAndUpdate(
    { postSeoUrl: postData.postSeoUrl },
    { $inc: { views: 1 } }
  )

  promise
    .then(doc => {
      Post.find({ postSeoUrl: postData.postSeoUrl }).then(doc2 =>
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
      postTitle: postData.postTitle,
      topic: postData.topic,
      postImage: postData.fileName,
      postKeywords: postData.postKeywords,
      postCustomUrl: postData.postCustomUrl,
      postSeoWords: postData.postSeoWords,
      postSeoUrl: postData.postSeoUrl,
      postSeoHeader: postData.postSeoHeader,
      postLanguage: postData.postLanguage,
      sliderImages: postData.sliderImages,
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

      uploadFile(postData.fileName)
        .then(data => console.log(data))
        .catch(err => console.log('ERROR ------------ \n', err))
      console.log('Post Image saved successfully')

      fs.unlink('./images/' + postData.fileName + '.jpeg', err => {
        if (err) console.log(err)
        else {
          console.log('\nDeleted file: ', postData.fileName)
        }
      })

      res.json('success')
    })
  })
})

router.post('/add_comment', jsonParser, (req, res) => {
  const postData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin' && !isAdmin === 'editor' && !isAdmin === 'writer') {
    res.json('Authentication Error')
  }

  Post.updateOne(
    { _id: postData.id },
    {
      $addToSet: {
        comments: {
          email: postData.email,
          comment: postData.comment,
          commentDate: postData.commentDate,
          isConfirmed: false
        }
      }
    }
  ).then(doc => res.json('success'))
})

router.post('/confirm_comment', jsonParser, (req, res) => {
  const commentData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') {
    res.json('Authentication Error')
  }

  Post.updateOne(
    { 'comments._id': commentData._id },
    {
      $set: {
        'comments.$.isConfirmed': true
      }
    }
  ).then(doc => res.json('success'))
})

router.post('/delete_comment', jsonParser, (req, res) => {
  const commentData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') {
    res.json('Authentication Error')
  }

  Post.updateOne(
    { 'comments._id': commentData._id },
    {
      $pull: {
        comments: {
          _id: commentData._id
        }
      }
    }
  ).then(doc => res.json('success'))
})

router.post('/carousel_image', jsonParser, (req, res) => {
  const postData = req.body
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  ba64.writeImage('./images/' + postData.fileName, postData.file, err => {
    if (err) res.json(err)

    uploadFile(postData.fileName)
      .then(data => console.log(data))
      .catch(err => console.log('ERROR ------------ \n', err))
    console.log('Carousel Image saved successfully')

    fs.unlink('./images/' + postData.fileName + '.jpeg', err => {
      if (err) console.log(err)
      else {
        console.log('\nDeleted file: ', postData.fileName)
      }
    })

    res.json('success')
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

router.post('/upload_video', jsonParser, (req, res) => {
  const postData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  if (req.files) {
    console.log(req.files)
    const file = req.files.file
    const fileName = file.name
    const mimetype = file.mimetype

    fs.writeFile('./videos/' + fileName, file.data, function (err, result) {
      if (err) res.json(err)
      else {
        const fileContent = fs.readFileSync('./videos/' + fileName)

        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: fileContent
        }

        s3.upload(params, (err, data) => {
          if (err) {
            throw err
          }

          fs.unlink('./videos/' + fileName, err => {
            if (err) console.log(err)
            else {
              console.log('\nDeleted file: ', fileName)
            }
          })

          console.log(`File uploaded successfully. ${data.location}`)
          res.json('success')
        })
      }
    })
  }
})

router.get('/video/:id', jsonParser, (req, res) => {
  const postData = req.body.data
  const { isAdmin } = decodeCookie(req.cookies.defensehere)

  if (!isAdmin === 'admin') res.json('Authentication Error')

  const videoPath = req.params.id

  const params = {
    Bucket: bucketName,
    Key: videoPath
  }

  s3.getObject(params)
    .on('httpHeaders', function (statusCode, headers) {
      res.set('Content-Length', headers['content-length'])
      res.set('Content-Type', headers['content-type'])
      this.response.httpResponse.createUnbufferedStream().pipe(res)
    })
    .send()
})


router.post('/posts_slider_1', jsonParser, async (req, res) => {
  const postData = req.body.data
  const categories = ["ABD", "TÜRKİYE", "UKRAYNA", "ALMANYA", "İSRAİL", "ÇİN"];
  const totalRows = [];
  categories.forEach(async C => {
    const rowsByCategory = await Posts.find({ categories: { $in: [C] } }).limit(7);
    const reMap = rowsByCategory.map(R => {
      R.categories = C;
      return R
    })
    totalRows = [...totalRows, ...rowsByCategory];
  })

  const mappedPosts = [];
  totalRows.forEach(T => {
    const isMapped = mappedPosts.find(M => M.category == T.categories);
    if (!isMapped) {
      mappedPosts.push({ category: T.categories, posts: [T] })
      return;
    }
    isMapped.posts.push(T);
  })


  res.json(totalRows)

})

module.exports = router
