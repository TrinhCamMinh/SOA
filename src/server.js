require('dotenv').config();
const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');
const { chefRoutes, customerRoutes, managerRoutes, waiterRoutes } = require('./resources/routes');
const app = express();

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
    res.render('404');
});

//* Start server
app.listen(process.env.PORT, () => {
    console.log(`listening on PORT ${process.env.PORT}...`);
    console.log(`http://localhost:3000/`);
});
