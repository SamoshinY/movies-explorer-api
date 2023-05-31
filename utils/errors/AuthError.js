module.exports = class AuthError extends Error {
  constructor() {
    super();
    this.message = 'Неправильное имя пользователя или пароль';
    this.statusCode = 401;
  }
};
