const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema(
    {
        quantity: {
            type: Number,
            required: [true, 'Bill must has at least one food'],
            validate: {
                validator: function (value) {
                    return value > 0;
                },
            },
            message: (props) => `${props.value} is less than 0`,
        },
        name: {
            type: [String],
            required: [true, 'Bill must include food'],
            validate: {
                validator: function (value) {
                    return value.length >= 1;
                },
                message: () => `Please provide at least one food `,
            },
        },
        price: {
            type: Number,
            required: [true, 'total price must be calculated'],
        },
        table: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('bills', billSchema);
