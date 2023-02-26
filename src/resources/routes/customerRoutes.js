const router = require('express').Router();
const { customerController } = require('../controllers');

router.get('/getID/:name', customerController.getFoodID);

router.get('/filter', customerController.filter);

router.get('/', customerController.homePage);

module.exports = router;
