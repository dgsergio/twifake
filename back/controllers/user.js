const { StatusCodes } = require('http-status-codes');
require('express-async-errors');
const User = require('../models/User');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, name: user.email } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  res.status(StatusCodes.OK).json({ user: { email: user.email } });
};

module.exports = { signup, login };
