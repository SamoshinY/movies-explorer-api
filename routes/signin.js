const router = require('express').Router();
const { signin } = require('../middlewares/request-validation');
const { login, deleteJwt } = require('../controllers/users');

router.post('/', signin, login).delete('/', deleteJwt);

module.exports = router;
