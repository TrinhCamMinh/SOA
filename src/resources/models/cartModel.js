const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: {
        type: String,
        require: [true, 'What is food name'],
    },
    quantity: {
        type: Number,
        require: true,
        default: 1,
    },
    note: String,
    price: {
        type: Number,
        require: true,
    },
    table: {
        type: Number,
        default: 1,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('carts', cartSchema);
