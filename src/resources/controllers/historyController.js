const { historyModel, foodModel } = require('../models/');
const updateHistory = async (req, res) => {
    try {
        const name = req.query.name;
        const type = req.query.type;
        const exist = await historyModel.findOne({ name });
        const { price } = await foodModel.findOne({ name }).select('price -_id');
        const { quantity } = (await historyModel.findOne({ name }).select('quantity -_id')) || 0;

        // * update ingredient's quantity
        if (!exist) {
            const data = await historyModel.create({ name, price });
            res.status(200).json(data);
        } else if (exist && type === 'add') {
            const data = await historyModel.findOneAndUpdate({ name }, { quantity: quantity + 1 }, { new: true });
            res.status(200).json(data);
        } else if (exist && type === 'minus' && quantity > 0) {
            //* the last condition will prevent user from minus when quantity is 0
            const data = await historyModel.findOneAndUpdate({ name }, { quantity: quantity - 1 }, { new: true });
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    updateHistory,
};
