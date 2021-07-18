const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage.js');

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Wrong Id');
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Wrong Id');
  }

  const deletedPost = await PostMessage.findByIdAndDelete(_id);
  res.json(deletedPost);
};

const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Wrong Id');
  }

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((_id) => _id === String(req.userId));

  if (index === -1) {
    //Like Post
    post.likes.push(req.userId);
  } else {
    //dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
