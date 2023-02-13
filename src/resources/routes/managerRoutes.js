const router = require('express').Router();
const { managerController } = require('../controllers');

router.get('/', managerController.homePage);

module.exports = router;
