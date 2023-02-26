const { billModel, foodModel } = require('../models/');

const homePage = async (req, res) => {
    try {
        res.render('./Manager/home');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const showBills = async (req, res) => {
    const bills = await billModel.find({}).populate({ path: 'foods.id' }).lean();
    res.render('./Manager/bill', { bills });
};

const getBillBaseOnDate = async (req, res) => {
    try {
        //! remember the date query format must be mm/dd/yy. Ex: 2-19-2023
        const date = new Date(req.query.date);
        //* get the date after the date that we pass in
        const date2 = new Date();
        date2.setDate(date.getDate() + 1);
        const tomorrowDate = new Date(date2.toLocaleString());
        const bills = await billModel.find({ createdAt: { $gt: date, $lt: tomorrowDate } }).populate({ path: 'foods.id' }).lean();
        
        res.render('./Manager/bill', { bills });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const showTables = async (req, res) => {
    try {
        const tables = [1, 2, 3, 4, 5, 6, 7, 8];
        res.render('./Manager/table', { tables });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const showFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({}).populate('ingredients').lean();
        res.render('./Manager/food', { foods });
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
    showBills,
    showFoods,
    showTables,
    getBillBaseOnDate,
    postBill,
};
