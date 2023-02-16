const { accountModel } = require('../models/');

const login = async (req, res) => {
    try {
        const { email, password, position } = req.body;
        const data = await accountModel.findOne({ email, password, position }).lean();
        if (!data) {
            res.status(500).json('Wrong account');
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const signup = async (req, res) => {
    try {
        const { userName, email, password, position } = req.body;
        const data = await accountModel.create({ userName, email, password, position });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    login,
    signup,
};
