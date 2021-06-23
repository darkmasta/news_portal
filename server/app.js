require('dotenv').config({
  path: 'variables.env'
})

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const passport = require('passport')
const bodyParser = require('body-parser')
const moment = require('moment')
const https = require('https')
moment.locale('en')
const path = require('path')
const { getFileStream } = require('./helpers/s3')
const PORT = process.env.PORT || 5000

// lets require/import the mongodb native drivers.
const mongoose = require('mongoose')

mongoose.Promise = require('bluebird')

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

const UserRoutes = require('./routes/user_routes')
const CategoryRoutes = require('./routes/category_routes')
const AuthorizationRoutes = require('./routes/authorization_routes')
const PostRoutes = require('./routes/post_routes')
const ActivityRoutes = require('./routes/activity_routes')
const AdRoutes = require('./routes/ad_routes')
const IdentityRoutes = require('./routes/identity_routes')
const TagRoutes = require('./routes/tag_routes')
const SeoRoutes = require('./routes/seo_routes')
const TranslationRoutes = require('./routes/language_routes')

const app = express()

const fileupload = require('express-fileupload')
app.use(fileupload())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8080' // dev to prod
    //origin: 'https://defensehere.herokuapp.com' // dev to prod
  })
)

app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: false }))
const jsonParser = bodyParser.json()
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
)

require('./routes/passport')(passport)

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
app.use(passport.session())

app.use('/', UserRoutes)
app.use('/', CategoryRoutes)
app.use('/', AuthorizationRoutes)
app.use('/', PostRoutes)
app.use('/', ActivityRoutes)
app.use('/', AdRoutes)
app.use('/', IdentityRoutes)
app.use('/', TagRoutes)
app.use('/', SeoRoutes)
app.use('/', TranslationRoutes)

const cons = require('consolidate')
app.engine('html', cons.swig)
app.use(express.static(__dirname + '/views/dist'))
app.set('views', __dirname + '/views/dist')
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('index.html')
})

app.post(
  '/login/local',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail'
  })
)

app.get('/images/:id', jsonParser, (req, res) => {
  let id = req.params.id

  // id = id.split('.')[0]

  const downloadParams = {
    Key: id,
    Bucket: bucketName
  }

  s3.getObject(downloadParams)
    .createReadStream()
    .on('error', e => {
      // handle aws s3 error from createReadStream
      console.log(e)
      res.end()
    })
    .pipe(res)
    .on('data', data => {
      // retrieve data
    })
    .on('end', () => {
      // stream has ended
    })
})

/*
app.get('/images/:id', jsonParser, (req, res) => {
  const id = req.params.id

  // path.resolve('temp/index.html')
  res.sendFile(id, { root: './images' })
})
*/

app.listen(PORT, () =>
  console.log(`Defensehere web listening on port ${PORT}!`)
)

// httpServer = http.createServer(app);
// httpsServer = https.createServer(https_options, app)

// httpServer.listen(PORT, hostname);
// httpsServer.listen(https_port, hostname)
