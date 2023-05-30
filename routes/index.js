const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const signinRouter = require('./signin');
const signoutRouter = require('./signout');
const signupRouter = require('./signup');
const PageNotFoundRouter = require('./non-existent-paths');
const auth = require('../middlewares/auth');

router
  .use('/signup', signupRouter)
  .use('/signin', signinRouter)
  .use('/sigout', signoutRouter)
  .use('/users', auth, userRouter)
  .use('/movies', auth, movieRouter)
  .use('*', PageNotFoundRouter);

module.exports = router;
