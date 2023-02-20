const router = require('express').Router();
const { cartController } = require('../controllers');

router.get('/', cartController.getCart);

router.post('/', cartController.postCart);

module.exports = router;
