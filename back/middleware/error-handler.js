const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ msg: err.message });
    next();
  }
  let error = {
    msg: 'something went wrong: ',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.code) {
    error.status = StatusCodes.BAD_REQUEST;
    error.msg = Object.keys(err.keyValue) + ' already exist';
  }

  if (err.name === 'ValidationError')
    error = {
      status: StatusCodes.BAD_REQUEST,
      msg: `Could not validate: ${Object.keys(err.errors).join(', ')}`,
    };

  if (err.name === 'JsonWebTokenError') {
    error = {
      status: StatusCodes.UNAUTHORIZED,
      msg: `Access token invalid`,
    };
  }

  if (err.name === 'CastError') {
    error = {
      status: StatusCodes.NOT_FOUND,
      msg: `No post found`,
    };
  }

  res.status(error.status).json({ msg: error.msg });
};

module.exports = errorHandler;
