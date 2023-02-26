const router = require('express').Router();
const { historyController } = require('../controllers');

router.post('/', historyController.updateHistory);

module.exports = router;
