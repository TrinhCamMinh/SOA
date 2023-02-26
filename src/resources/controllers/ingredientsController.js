const { ingredientModel } = require('../models/');

const updateIngredients = async (req, res) => {
    try {
        const name = req.query.name;
        const type = req.query.type;
        const exist = await ingredientModel.findOne({ name });
        const { quantity } = (await ingredientModel.findOne({ name }).select('quantity -_id')) || 0;

        // * update ingredient's quantity
        if (!exist) {
            res.status(500).json('Invalid ingredient');
        } else if (exist && type === 'add') {
            const data = await ingredientModel.findOneAndUpdate({ name }, { quantity: quantity + 1 }, { new: true });
            res.status(200).json(data);
        } else if (exist && type === 'minus' && quantity > 0) {
            //* the last condition will prevent user from minus when quantity is 0
            const data = await ingredientModel.findOneAndUpdate({ name }, { quantity: quantity - 1 }, { new: true });
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    updateIngredients,
};
