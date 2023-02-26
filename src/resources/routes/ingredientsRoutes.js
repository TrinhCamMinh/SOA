const router = require('express').Router();
const { ingredientsController } = require('../controllers');

router.post('/', ingredientsController.updateIngredients);

module.exports = router;
