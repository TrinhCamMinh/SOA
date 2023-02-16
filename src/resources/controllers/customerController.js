const { foodModel } = require('../models/');

const homePage = async (req, res) => {
    const data = await foodModel.find({}).lean();
    res.render('./Customer/home', { data });
};

module.exports = {
    homePage,
};
