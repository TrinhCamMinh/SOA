const { cartModel } = require('../models');
const getCart = async (req, res) => {
    res.status(200).json('success');
};

const postCart = async (req, res) => {
    try {
        const { name, price } = req.body;
        const data = await cartModel.create({ name, price });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    getCart,
    postCart,
};
