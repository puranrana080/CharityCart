const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const app= express()
const cors=require('cors')
const sequelize=require('./util/database')
require('dotenv').config()


const User=require('./model/user')
const Charity = require('./model/charity')
const Donation = require('./model/donation')


// Middleware to parse incoming JSON requests and URL-encoded form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:3000"
}))

const userRoutes=require('./routes/user')
const profileRoutes=require('./routes/profile')
const charityRoutes=require('./routes/charity')
const adminRoutes=require('./routes/admin')

//server static files from public folder
app.use(express.static(path.join(__dirname,'public')))


app.use(userRoutes)
app.use(profileRoutes)
app.use(charityRoutes)
app.use(adminRoutes)


User.hasMany(Charity)
Charity.belongsTo(User)

User.hasMany(Donation)
Donation.belongsTo(User)

Charity.hasMany(Donation)
Donation.belongsTo(Charity)


sequelize.sync()
//    sequelize.sync({force:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log('inside charityCart')
        console.log('Listening to port 3000')
    })
})
.catch(err => {
    console.log(err)
})


