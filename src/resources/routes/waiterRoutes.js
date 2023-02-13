const router = require('express').Router();
const { waiterController } = require('../controllers');

router.get('/', waiterController.homePage);

module.exports = router;
