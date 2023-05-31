const mongoose = require('mongoose');
const validator = require('validator');
const {
  requiredFieldError,
  invalidURLError,
} = require('../utils/errors/validationErrors');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, requiredFieldError],
    },
    director: {
      type: String,
      required: [true, requiredFieldError],
    },
    duration: {
      type: Number,
      required: [true, requiredFieldError],
    },
    year: {
      type: String,
      required: [true, requiredFieldError],
    },
    description: {
      type: String,
      required: [true, requiredFieldError],
    },
    image: {
      type: String,
      required: [true, requiredFieldError],
      validate: {
        validator: (value) => validator.isURL(value),
        message: invalidURLError,
      },
    },
    trailer: {
      type: String,
      required: [true, requiredFieldError],
      validate: {
        validator: (value) => validator.isURL(value),
        message: invalidURLError,
      },
    },
    thumbnail: {
      type: String,
      required: [true, requiredFieldError],
      validate: {
        validator: (value) => validator.isURL(value),
        message: invalidURLError,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: [true, requiredFieldError],
    },
    nameEN: {
      type: String,
      required: [true, requiredFieldError],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('movie', movieSchema);
