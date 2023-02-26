const router = require('express').Router();
const { accountController } = require('../controllers');

router.post('/signup', accountController.signup);

router.post('/login', accountController.login);

module.exports = router;
