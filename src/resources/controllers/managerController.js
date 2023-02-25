const { billModel, foodModel } = require('../models/');

const homePage = async (req, res) => {
    try {
        res.render('./Manager/home');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const filter = async (req, res) => {
    const { option } = req.params;
    if (option === 'foods') {
        const foods = await foodModel.find({}).populate('ingredients').lean();
        res.render('./Manager/home', { foods });
    } else if (option === 'bills') {
        const bills = await billModel.find({}).populate({ path: 'foods.id' }).lean();
        res.render('./Manager/home', { bills });
    } else {
        const tables = [1, 2, 3, 4, 5, 6, 7, 8];
        res.render('./Manager/home', { tables });
    }
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
    filter,
    getBillBaseOnDate,
    postBill,
};
