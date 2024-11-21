const Sequelize=require('sequelize')
const sequelize=require('../util/database')


const Donation = sequelize.define('donation',{
    amount:{
        type:Sequelize.INTEGER
    },
    date:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING
})

module.exports=Donation