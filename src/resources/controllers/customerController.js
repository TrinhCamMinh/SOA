const { foodModel } = require('../models/');

const homePage = async (req, res) => {
    const data = await foodModel.find({}).lean();
    res.render('./Customer/home', { data });
};

const filter = async (req, res) => {
    try {
        const type = req.query.type;
        const data = await foodModel.find({ type }).lean();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    filter,
};
