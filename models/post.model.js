const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
  author: String,
  date: Date,
  type: String,
  content: String
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;