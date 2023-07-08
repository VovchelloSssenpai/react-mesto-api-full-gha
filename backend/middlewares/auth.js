const jwt = require('jsonwebtoken');
const WrongDataError = require('../utils/WrongDataError');
const { JWT_SECRET, NODE_ENV } = require('../utils/utils');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    let token;
    let payload;
    if (authorization.includes('Bearer')) { token = authorization.replace('Bearer ', ''); } else {
      token = authorization;
    }

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new WrongDataError());
    }

    req.user = payload;
    return next();
  } return next(new WrongDataError());
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
