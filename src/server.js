require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const { chefRoutes, customerRoutes, managerRoutes, waiterRoutes } = require('./resources/routes');
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
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//* Routes
app.use('/', customerRoutes);
app.use('/chef', chefRoutes);
app.use('/manager', managerRoutes);
app.use('/waiter', waiterRoutes);

app.use('/', (req, res) => {
    res.render('404', { layout: 'layout404' });
});

//* Start server
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`listening on PORT ${process.env.PORT}...`);
            console.log(`http://localhost:3000/`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
