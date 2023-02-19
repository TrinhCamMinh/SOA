const router = require('express').Router();
const { managerController } = require('../controllers');

router.get('/', managerController.homePage);
router.get('/bill', managerController.getBillBaseOnDate);
router.post('/bill', managerController.postBill);

module.exports = router;
