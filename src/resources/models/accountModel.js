const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountsSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, 'User name must be exist'],
        },
        email: {
            type: String,
            required: [true, 'Account must has an email'],
            unique: [true, 'This email was in used'],
            validate: {
                //* check email regex
                validator: function (value) {
                    return value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                },
            },
        },
        password: {
            type: String,
            required: [true, 'Account must has password'],
            unique: [true, 'This password was in used'],
        },
        position: {
            type: String,
            required: [true, 'Please provide us your position'],
            enum: ['waiter', 'manager', 'chef'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Accounts', accountsSchema);
