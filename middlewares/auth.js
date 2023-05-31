const jwt = require('jsonwebtoken');
const AuthError = require('../utils/errors/AuthError');
const { noTokenError, tokenError } = require('../utils/messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AuthError(noTokenError));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return next(new AuthError(tokenError));
  }

  req.user = payload;

  return next();
};
