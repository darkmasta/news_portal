const mongoose = require('mongoose')
const Float = require('mongoose-float').loadType(mongoose, 5)

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const postSchema = new Schema({
  owner: String,
  ownerEmail: String,
  topic: String,
  postKeywords: String,
  postCustomUrl: String,
  postSeoWords: String,
  postSeoUrl: String,
  postSeoWords: String,
  postSeoUrl: String,
  postLanguage: String,
  publishDate: Date,
  publishHour: String,
  postEnglishLink: String,
  postArabicLink: String,
  postRussianLink: String,
  postUkranianLink: String,
  postFrenchLink: String,
  postTitle: String,
  categories: [String],
  sliderImages: [String],
  manset: Boolean,
  videoLink: String,
  videoName: String,
  postImage: String,
  content: String,
  state: String,
  postOrder: Number,
  date: { type: Date, default: Date.now },
  logs: [
    {
      editor: String,
      editDate: Date,
      editText: String
    }
  ],
  postLanguages: [String],
  tags: [String],
  isLocked: Boolean,
  lockerEditor: String,
  isOnAir: Boolean,
  isDraft: Boolean,
  position: String,
  views: Number,
  mobile: Boolean
})

module.exports.postSchema = postSchema
