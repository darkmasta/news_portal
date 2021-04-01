var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var postSchema = new Schema({
  owner: ObjectId,
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
  postImage: String,
  content: String,
  state: String,
  date: { type: Date, default: Date.now },
  logs: [
    {
      editor: String,
      editDate: Date,
      editText: String,
    },
  ],
  postLanguages: [String],
  isNowEditing: Boolean,
  isOnAir: Boolean,
  isDraft: Boolean,
  position: String,
});

module.exports.postSchema = postSchema;
