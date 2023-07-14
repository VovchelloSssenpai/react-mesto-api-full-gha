const IncorrectError = require('../utils/IncorrectError');
const ConflictError = require('../utils/ConflictError');
const { DEFAULT_ERROR_CODE } = require('../utils/utils')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;
   console.log(err);

  if (err.code === 11000) {
    error = new ConflictError('Пользователь с таким имейлом уже существует');
  } else if (err.name === 'CastError') {
    error = new IncorrectError('Переданы некоректные данные');
  }

  res
    .status(error.statusCode || DEFAULT_ERROR_CODE)
    .send({
      message: error.statusCode ? error.message : 'Внутренняя ошибка',
    });
};

module.exports = errorHandler;
