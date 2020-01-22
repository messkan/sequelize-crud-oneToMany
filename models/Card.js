const Sequelize = require('sequelize');
const db = require('../config/database');

// creation of the User model
const Card = db.define('card', {

    num: {
       type: Sequelize.INTEGER
    }
   
});


module.exports = Card;
