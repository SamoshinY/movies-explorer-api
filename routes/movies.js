const movieRouter = require('express').Router();
const { bodyMovie, idMovie } = require('../middlewares/request-validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRouter
  .get('/', getMovies)
  .post('/', bodyMovie, createMovie)
  .delete('/:movieId', idMovie, deleteMovie);

module.exports = movieRouter;
