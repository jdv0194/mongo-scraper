var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  favorited: {
    type: Boolean,
    default: false
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
