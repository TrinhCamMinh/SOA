const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//* generate a number from 1 to 8 represent 8 tables
const generateRandom = () => {
    return Math.floor(Math.random() * 8) + 1;
};

const cartSchema = new Schema(
    {
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
            //*  If you type ‘default: generateRandom()’, you are passing the result of the function as a default value, not the function itself. This means that mongoose will only call the function once when you define the schema and use the same value for all documents. This is not what you want.
            //*  You should use ‘default: generateRandom’ without parentheses to pass the function as a default value. This way, mongoose will call the function every time you create a new document and assign its result to the field.
            default: generateRandom,
        },
        done: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('carts', cartSchema);
