const movieRouter = require('express').Router();
const { bodyMovie, idMovie } = require('../middlewares/request-validation');

const {
  createMovie,
  getMoviesByOwnerId,
  deleteMovie,
} = require('../controllers/movies');

movieRouter
  .get('/', getMoviesByOwnerId)
  .post('/', bodyMovie, createMovie)
  .delete('/:movieId', idMovie, deleteMovie);

module.exports = movieRouter;
