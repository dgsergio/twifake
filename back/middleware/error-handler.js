const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: 'Something went wrong :(' + err });
};

module.exports = errorHandler;
