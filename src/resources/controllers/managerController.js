const { billModel } = require('../models/');

const homePage = async (req, res) => {
    const data = await billModel.find({}).populate({ path: 'foods.food' }).lean();
    res.render('./Manager/home', { data });
};

const getBillBaseOnDate = async (req, res) => {
    try {
        //! remember the date query format must be mm/dd/yy. Ex: 2-19-2023
        const date = new Date(req.query.date);
        //* get the date after the date that we pass in
        const date2 = new Date();
        date2.setDate(date.getDate() + 1);
        const tomorrowDate = new Date(date2.toLocaleString());
        const data = await billModel.find({ createdAt: { $gt: date, $lt: tomorrowDate } }).select('createdAt -_id');

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const postBill = async (req, res) => {
    const { quantity, foods, total, table } = req.body;
    try {
        const data = await billModel.create({ quantity, foods, total, table });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    homePage,
    getBillBaseOnDate,
    postBill,
};
