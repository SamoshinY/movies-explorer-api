const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicateKeyError = require('../utils/errors/DuplicateKeyError');
const { dataDeleted, successfulAuthorization } = require('../utils/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

const findUser = (req, res, data, next) => {
  User.findById(data)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  findUser(req, res, req.user._id, next);
};

const updateData = (req, res, next) => {
  const userData = req.body;
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicateKeyError());
      }
      return next();
    });
};

module.exports.updateProfile = (req, res, next) => {
  updateData(req, res, next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicateKeyError());
      }
      return next();
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.json({ message: successfulAuthorization });
    })
    .catch(next);
};

module.exports.deleteJwt = (req, res, next) => {
  res.clearCookie('jwt');
  res.send({ message: dataDeleted });
  next();
};
