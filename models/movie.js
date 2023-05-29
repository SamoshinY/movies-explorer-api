const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательное поле не заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Некорректная ссылка',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Некорректная ссылка',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Некорректная ссылка',
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
      required: [true, 'Обязательное поле не заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательное поле не заполнено'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('movie', movieSchema);
