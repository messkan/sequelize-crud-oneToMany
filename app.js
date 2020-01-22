const express = require('express');
const app = express();
const User = require('./models/User');
const Card = require('./models/Card');
const accountRoutes = require('./routes/account');
const cardRoutes = require('./routes/card');
const bodyParser = require('body-parser');

// configuration of the rest API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});



// Database
const db = require('./config/database');


//One to Many relation
User.hasMany(Card , {as : 'card' } );

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('User table not created,  error'));



// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));






app.use('/account');
app.use('/card');




module.exports = app;
