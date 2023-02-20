const tables = [1, 2, 3, 4, 5, 6, 7, 8];

const homePage = async (req, res) => {
    res.render('./Waiter/home', { tables });
};

module.exports = {
    homePage,
};
