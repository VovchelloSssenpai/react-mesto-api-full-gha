const IncorrectError = require('../utils/IncorrectError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');
const WrongDataError = require('../utils/WrongDataError');
const LimitedAccessError = require('../utils/LimitedAccessError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.code === 11000) {
    error = new ConflictError('Пользователь с таким имейлом уже существует');
  }

  res
    .status(error.statusCode)
    .send({
      message: error.message,
    });
};

module.exports = errorHandler;
