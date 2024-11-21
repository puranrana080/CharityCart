const Sequelize = require('sequelize')
const sequelize = require('../util/database')


const User = sequelize.define('users', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false

    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    userPhone: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role:{
        type:Sequelize.STRING,
        defaultValue:'user',
        allowNull:false

    },
    total_donation:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    campaignSupported:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})
module.exports = User