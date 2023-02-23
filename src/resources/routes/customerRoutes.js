const router = require('express').Router();
const { customerController } = require('../controllers');

router.get('/', customerController.homePage);

router.get('/filter', customerController.filter);

module.exports = router;
