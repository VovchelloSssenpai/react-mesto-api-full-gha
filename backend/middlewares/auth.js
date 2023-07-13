const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');
const { JWT_SECRET, NODE_ENV, DEV_SECRET } = require('../utils/utils');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    } catch (err) {
      return next(new AuthorizationError('Ошибка авторизации'));
    }

    req.user = payload;
    return next();
  } return next(new AuthorizationError('Ошибка авторизации'));
};

module.exports = auth;

// COOKIE AUTHENTICATION

// const auth = (req, res, next) => {
//   console.log(req.headers.authorization);
//   const token = req.cookies.jwt;
//   let payload;

//   try {
//     payload = jwt.verify(token, 'SECRET');
//   } catch (err) {
//     next(new WrongDataError());
//   }

//   req.user = payload;
//   return next();
// };

// module.exports = auth;
