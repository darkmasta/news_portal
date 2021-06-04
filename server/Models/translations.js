const mongoose = require('mongoose')
const Translations = require('../Schemas/translations_schema')

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  //   console.log("Database connection succeeded.");
})

const Translation = mongoose.model(
  'Translation',
  Translations.translationSchema
)

module.exports.Translation = Translation
