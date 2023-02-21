const { foodModel } = require('../models/');

const homePage = async (req, res) => {
    try {
        const data = await foodModel.find({}).populate('ingredients').lean();
        // res.render('./Customer/home', { data });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const filter = async (req, res) => {
    try {
        const type = req.query.type;
        const filter = await foodModel.find({ type }).lean();
        res.render('./Customer/home', { filter });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    filter,
};
