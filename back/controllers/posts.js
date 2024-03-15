const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Unauthorize, NotFoundError } = require('../errors');

const createPost = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const { id: createdBy } = jwt.verify(token, process.env.JWT_SECRET);
  const post = await Post.create({ ...req.body, createdBy });
  res.status(StatusCodes.OK).json({ id: post._id });
};

const getPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(StatusCodes.OK).json({ posts });
};

const getPostsByUser = async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ name: userName });
  if (!user) throw new Unauthorize('User does not exist');
  const posts = await Post.find({ createdBy: user._id });
  res.status(StatusCodes.OK).json({ userName, posts });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const { id: createdBy } = jwt.verify(token, process.env.JWT_SECRET);
  const post = await Post.findOneAndDelete({ _id: id, createdBy });
  if (!post) throw new NotFoundError('Post does not exist');
  res.status(StatusCodes.OK).json({ post });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const { id: createdBy } = jwt.verify(token, process.env.JWT_SECRET);
  const post = await Post.findOneAndUpdate(
    {
      createdBy,
      _id: id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.CREATED).json({ id: post._id });
};

module.exports = {
  getPosts,
  getPostsByUser,
  createPost,
  deletePost,
  updatePost,
};
