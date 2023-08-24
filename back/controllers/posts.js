const { StatusCodes } = require('http-status-codes');
require('express-async-errors');

const getPosts = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'get all posts' });
};

const getPost = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `get post id: ${id}` });
};

const createPost = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'post a posts' });
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `patch post id: ${id}` });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: `delete post id: ${id}` });
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
