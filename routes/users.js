const userRouter = require('express').Router();
const { bodyUser } = require('../middlewares/request-validation');

const { getCurrentUser, updateProfile } = require('../controllers/users');

userRouter.get('/me', getCurrentUser).patch('/me', bodyUser, updateProfile);

module.exports = userRouter;
