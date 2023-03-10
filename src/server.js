require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const {
    chefRoutes,
    customerRoutes,
    managerRoutes,
    waiterRoutes,
    accountRoutes,
    historyRoutes,
    ingredientsRoutes,
    cartRoutes,
} = require('./resources/routes');
const app = express();
const mongoose = require('mongoose');

//* middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//* Template Engine
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            //* increasing index by 1 (default start with 0)
            increaseIndexByOne: (index) => index + 1,

            //* time two elements (food's price with food's quantity)
            multiply: (a, b) => a * b,

            //* formatting currency to dollar
            formatCurrency: (price) => {
                if (price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' $';
            },

            //* formatting date base on US style
            formatDate: (date) => {
                return new Intl.DateTimeFormat('en-us', { dateStyle: 'full', timeStyle: 'long' }).format(date);
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//* Routes
app.use('/', customerRoutes);
app.use('/chef', chefRoutes);
app.use('/manager', managerRoutes);
app.use('/waiter', waiterRoutes);
app.use('/account', accountRoutes);
app.use('/history', historyRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/cart', cartRoutes);

app.use('/404', (req, res) => {
    res.render('404', { layout: 'layout404' });
});

//* Start server
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connect database successfully`);
            console.log(`listening on PORT ${process.env.PORT}...`);
            console.log(`http://localhost:${process.env.PORT}/`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
