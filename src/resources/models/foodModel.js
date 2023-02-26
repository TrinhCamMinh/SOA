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
        images: {
            type: String,
            required: [true, 'Food must have image'],
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
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'Ingredient',
            required: [true, 'Food must have ingredients'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Food', foodSchema);
