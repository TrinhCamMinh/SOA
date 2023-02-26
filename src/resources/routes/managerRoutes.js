const router = require('express').Router();
const { managerController } = require('../controllers');

router.get('/bill', managerController.getBillBaseOnDate);
router.get('/bills', managerController.showBills);
router.get('/tables', managerController.showTables);
router.get('/foods', managerController.showFoods);
router.get('/', managerController.homePage);

router.post('/bill', managerController.postBill);

module.exports = router;
