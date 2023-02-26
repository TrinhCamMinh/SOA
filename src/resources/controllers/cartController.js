const mongoose = require('mongoose');
const { cartModel } = require('../models');

const getCart = async (req, res) => {
    res.status(200).json('success');
};

const postCart = async (req, res) => {
    try {
        const { name, price, quantity, note } = req.body;
        const data = await cartModel.create({ name, price, quantity, note });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updateDoneStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.query.done;
        const data = await cartModel.findByIdAndUpdate(id, { done: status }, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    getCart,
    postCart,
    updateDoneStatus,
};
