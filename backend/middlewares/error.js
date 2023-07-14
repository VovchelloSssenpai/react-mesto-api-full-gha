const IncorrectError = require('../utils/IncorrectError');
const ConflictError = require('../utils/ConflictError');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;
  // console.log(err);

  if (err.code === 11000) {
    error = new ConflictError('Пользователь с таким имейлом уже существует');
  } else if (err.name === 'CastError') {
    error = new IncorrectError('Переданы некоректные данные');
  } else {
    error = {
      statusCode: 500,
      message: 'Внутренняя ошибка',
    };
  }

  res
    .status(error.statusCode)
    .send({
      message: error.message,
    });
};

module.exports = errorHandler;
