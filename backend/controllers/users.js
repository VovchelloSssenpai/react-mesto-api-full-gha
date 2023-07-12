const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const WrongDataError = require('../utils/WrongDataError');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');
const IncorrectError = require('../utils/IncorrectError');
const { JWT_SECRET, NODE_ENV, DEV_SECRET } = require('../utils/utils');
const ConflictError = require('../utils/ConflictError');

const getUserById = (
  (req, res, next) => {
    User.findById(req.params.id)
      .orFail(() => new IncorrectError('Неверные данные'))
      .then((user) => { res.send(user); })
      .catch(() => next(new NotFoundError('Пользователь не найден')));
  });

const getUsers = (
  (req, res, next) => {
    User.find({})
      .then((usersData) => res.send(usersData))
      .catch(next);
  });

const getUser = (
  (req, res, next) => {
    User.findById(req.user._id)
      .orFail(() => new IncorrectError('Неверные данные'))
      .then((user) => { res.send(user); })
      .catch(() => next(new NotFoundError('Пользователь не найден')));
  });

const createUser = (
  (req, res, next) => {
    const userData = {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: req.body.password,
    };

    bcrypt.hash(String(req.body.password), 10)
      .then((hashedPassword) => {
        User.create({ ...userData, password: hashedPassword })
          .then((user) => { res.status(201).send(user); })
          .catch(() => next(new ConflictError('Ошибка валидации')));
      });
  });

const updateUser = (
  (req, res, next) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => { if (!user) { throw new NotFoundError('Пользователь не найден'); } return res.send(user); })
      .catch(next);
  });

const updateAvatar = (
  (req, res, next) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => { if (!user) { throw new NotFoundError('Пользователь не найден'); } return res.send(user); })
      .catch(next);
  });

const login = (
  (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .select('+password')
      .orFail(() => new WrongDataError('Неверные данные'))
      .then((user) => {
        bcrypt.compare(String(password), user.password).then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);

            res.send({ data: user.toJSON(), token: jwt });
          } else {
            next(new WrongDataError('Неверные данные'));
          }
        });
      })
      .catch(next);
  }
);

module.exports = {
  getUserById,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};

// COOKIE LOGIN

// const login = (
//   (req, res, next) => {
//     const { email, password } = req.body;
//     User.findOne({ email })
//       .select('+password')
//       .orFail(() => new WrongDataError())
//       .then((user) => {
//         console.log();
//         bcrypt.compare(String(password), user.password).then((isValidUser) => {
//           if (isValidUser) {
//             const jwt = jsonWebToken.sign({
//               _id: user._id,
//             }, 'SECRET');
//             res.cookie('jwt', jwt, { // meniaem na token
//               maxAge: 360000,
//               httpOnly: true,
//               sameSite: true,
//             });

//             res.send({ data: user.toJSON() });
//           } else {
//             next(new WrongDataError());
//           }
//         });
//       })
//       .catch(next);
//   }
// );
