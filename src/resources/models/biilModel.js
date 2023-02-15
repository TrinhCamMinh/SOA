const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema(
    {
        quantity: {
            type: Number,
            required: [true, 'Bill must has at least one food'],
            validate: {
                validator: function (value) {
                    return value < 0;
                },
            },
            message: (props) => `${props.value} is less than 0`,
        },
        name: {
            type: String,
            required: [true, 'Food must has a specific name'],
        },
        price: {
            type: Number,
            required: [true, 'total price must be calculated'],
        },
        table: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('bills', billSchema);
