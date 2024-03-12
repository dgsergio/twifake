const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const User = require('../models/User');
const { Unauthorize } = require('../errors');

const signup = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createToken(user._id);
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user) throw new Unauthorize('User does not exist');
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) throw new Unauthorize('Invalid password');
  const token = user.createToken(user._id);
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, _id: user._id }, token });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) throw new Unauthorize('There is not users');

  let userInfo = [];
  for (const i of users) {
    userInfo.push({
      name: i.name,
      email: i.email,
      perfilUrl: i.perfilUrl,
      _id: i._id,
    });
  }

  console.log(userInfo);

  res.status(StatusCodes.OK).json(userInfo);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  const userInfo = {
    _id: user._id,
    name: user.name,
    email: user.email,
    perfilUrl: user.perfilUrl,
  };
  res.status(StatusCodes.OK).json(userInfo);
};

module.exports = { signup, login, getAllUsers, getUserById };
