const { StatusCodes } = require('http-status-codes');

const routeNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Route does not exist.' });
};

module.exports = routeNotFound;
