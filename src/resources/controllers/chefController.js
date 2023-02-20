const { cartModel, foodModel } = require('../models');

const homePage = async (req, res) => {
    try {
        const orders = await cartModel.find({}).lean();
        const foods = await foodModel.find({}).lean();
        res.render('./Chef/home', { orders, foods });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
};
