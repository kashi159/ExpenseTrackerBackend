const Sequelize = require('sequelize')
const sequelize = require('../util/userDatabase')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
       type: Sequelize.STRING,
       allowNull: false
    } ,
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremiumUser: Sequelize.BOOLEAN,
    totalExpense:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    } 
});

module.exports = User;