const router = require('express').Router();
const { customerController } = require('../controllers');

router.get('/', customerController.homePage);

module.exports = router;
