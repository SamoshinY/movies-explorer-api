const Movie = require('../models/movie');
const { COMPLETED } = require('../utils/response-status-code');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const dataDeleted = require('../utils/messages');

module.exports.getMoviesByOwnerId = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(COMPLETED).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie._id)
          .orFail()
          .then(res.send({ message: dataDeleted }))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch(next);
};
