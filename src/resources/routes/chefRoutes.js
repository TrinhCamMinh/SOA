const router = require('express').Router();
const { chefController } = require('../controllers');

router.get('/', chefController.homePage);

router.put('/toggle', chefController.toggleFood);

module.exports = router;
