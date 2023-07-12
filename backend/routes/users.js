const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getUsers, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.get('/', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().required().min(2).max(30)
      .default('Исследователь'),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/),
  }),
}), updateAvatar);

module.exports = router;
