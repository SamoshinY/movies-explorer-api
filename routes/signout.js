const router = require('express').Router();
const { deleteJwt } = require('../controllers/users');

router.post('/', deleteJwt);

module.exports = router;
