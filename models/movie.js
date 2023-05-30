const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Обязательное поле country не заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Обязательное поле director не заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Обязательное поле duration не заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Обязательное поле year не заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Обязательное поле description не заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Обязательное поле image не заполнено'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Некорректная ссылка',
      },
    },
    trailer: {
      type: String,
      required: [true, 'Обязательное поле trailer не заполнено'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'Некорректная ссылка',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Обязательное поле thumbnail не заполнено'],
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
      required: [true, 'Обязательное поле nameRU не заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Обязательное поле nameEN не заполнено'],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('movie', movieSchema);
