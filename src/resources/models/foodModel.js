const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Food name is required'],
            unique: [true, 'Food name must be unique'],
            validate: {
                validator: function (value) {
                    //* if this return true then pass the validator
                    return typeof value != Number;
                },
                message: (props) => `${props.value} is not a valid food name!`,
            },
        },
        type: {
            type: String,
            required: [true, 'Food must have type of food'],
            enum: ['meat', 'vegetable', 'drink'],
        },
        price: {
            type: Number,
            required: [true, 'Food must has price'],
            default: 0,
            validate: {
                validator: function (value) {
                    //* if this return true then pass the validator
                    return value > 0;
                },
                message: (props) => `${props.value} is not a valid price`,
            },
        },
        ingredients: {
            type: [String],
            required: [true, 'Food must have ingredients'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Food', foodSchema);
