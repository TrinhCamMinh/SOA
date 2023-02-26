const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('Ingredient', ingredientsModel);
