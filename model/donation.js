const Sequelize=require('sequelize')
const sequelize=require('../util/database')


const Donation = sequelize.define('donation',{
    amount:{
        type:Sequelize.INTEGER
    },
    date:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    }
})

module.exports=Donation