const Card = require('../models/card');
const LimitedAccessError = require('../utils/LimitedAccessError');
const IncorrectError = require('../utils/IncorrectError');
const NotFoundError = require('../utils/NotFoundError');

const getCards = ((req, res, next) => {
  Card.find({}).then((cardsData) => res.send(cardsData))
    .catch(next);
});

const deleteCardById = ((req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new LimitedAccessError('Пользователь не найден'))
    .then((user) => {
      console.log(user);
      if (req.user._id !== user.owner.toString()) {
        throw new IncorrectError('Неверные данные');
      }
      return Card.findByIdAndRemove(req.params.id).then((data) => res.send(data));
    })
    .catch((err) => { next(new NotFoundError('Пользователь не найден')); console.log(err); });
});

const createCard = ((req, res, next) => {
  const cardData = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(cardData)
    .then((user) => res.status(201).send(user))
    .catch(() => next(new IncorrectError('Неверные данные')));
});

const likeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new IncorrectError('Неверные данные'))
    .then((user) => { res.status(201).send(user); })
    .catch(() => next(new NotFoundError('Пользователь не найден')));
}
);

const dislikeCard = ((req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new IncorrectError('Неверные данные'))
  .then((user) => { res.send(user); })
  .catch(() => next(new NotFoundError('Пользователь не найден'))));

module.exports = {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
};
