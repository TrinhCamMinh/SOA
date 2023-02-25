const router = require('express').Router();
const { cartController } = require('../controllers');

router.get('/', cartController.getCart);

router.post('/', cartController.postCart);

router.put('/:id', cartController.updateDoneStatus);

module.exports = router;
