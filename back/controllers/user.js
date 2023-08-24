const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const User = require('../models/User');
const { Unauthorize } = require('../errors');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.createToken();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.email, token } });
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user) throw new Unauthorize('User does not exist');
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) throw new Unauthorize('Invalid password');
  const token = user.createToken();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { signup, login };
