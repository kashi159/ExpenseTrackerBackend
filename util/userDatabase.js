const Sequelize = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.SQL_NAME;
const DB_USERNAME = process.env.SQL_KEY;
const DB_PASSWORD = process.env.SQL_SECRET;


const sequelize = new Sequelize(DB_NAME , DB_USERNAME , DB_PASSWORD , {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;