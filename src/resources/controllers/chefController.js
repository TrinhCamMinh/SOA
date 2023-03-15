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

const toggleFood = async (req, res) => {
    try {
        const id = req.query.id;
        const toggle = req.query.toggle;
        const data = await foodModel.findByIdAndUpdate(id, { toggle }, { new: true });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    toggleFood,
};
