const router = require('express').Router();
const { chefController } = require('../controllers');

router.get('/', chefController.homePage);

module.exports = router;
