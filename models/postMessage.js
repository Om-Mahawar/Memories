const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  githubLink: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [Object],
    default: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;
