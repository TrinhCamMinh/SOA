const { billModel } = require('../models/');

const homePage = async (req, res) => {
    const data = await billModel.find({}).lean();
    res.render('./Manager/home', { data });
};

const postBill = async (req, res) => {
    const { quantity, name, price, table } = req.body;
    try {
        const data = await billModel.create({ quantity, name, price, table });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    postBill,
};
