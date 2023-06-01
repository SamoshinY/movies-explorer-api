const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../utils/errors/AuthError');
const {
  RequiredFieldError,
  MinLengthError,
  MaxLengthError,
  InvalidEmailError,
} = require('../utils/errors/validationErrors');
const { incorrectCredentials } = require('../utils/messages');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, RequiredFieldError],
      minlength: [2, MinLengthError],
      maxlength: [30, MaxLengthError],
    },
    email: {
      type: String,
      required: [true, RequiredFieldError],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: InvalidEmailError,
      },
    },
    password: {
      type: String,
      required: [true, RequiredFieldError],
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) {
              return Promise.reject(new AuthError(incorrectCredentials));
            }

            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                return Promise.reject(new AuthError(incorrectCredentials));
              }

              return user;
            });
          });
      },
    },
  }
);

module.exports = mongoose.model('user', userSchema);
