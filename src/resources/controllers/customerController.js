const { foodModel } = require('../models/');

const homePage = async (req, res) => {
    try {
        const data = await foodModel.find({}).populate('ingredients').lean();
        res.render('./Customer/home', { data });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const filter = async (req, res) => {
    try {
        const type = req.query.type;
        if (type === 'BestSeller') {
            const data = await foodModel.find({ favorite: true }).populate('ingredients').lean();
            res.render('./Customer/home', { data });
        } else {
            const data = await foodModel.find({ type }).populate('ingredients').lean();
            res.render('./Customer/home', { data });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    filter,
};
