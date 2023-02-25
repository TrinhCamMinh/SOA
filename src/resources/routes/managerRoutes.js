const router = require('express').Router();
const { managerController } = require('../controllers');

router.get('/', managerController.homePage)

router.get('/filter/:option', managerController.filter);

router.post('/bill', managerController.postBill);

module.exports = router;
