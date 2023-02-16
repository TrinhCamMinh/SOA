const router = require('express').Router();
const { managerController } = require('../controllers');

router.get('/', managerController.homePage);
router.post('/', managerController.postBill);

module.exports = router;
