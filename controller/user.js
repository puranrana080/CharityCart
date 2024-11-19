const path = require('path')
const bcrypt = require('bcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
require('dotenv').config


exports.getHomePage = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'))

}

exports.postUserRegister = async (req, res, next) => {
    try {
        console.log("User detail received in server", req.body)
        const { name, email, phone, password } = req.body

        //cheking if user already exist will emailid
        const existingUser = await User.findOne({ where: { userEmail: email } })
        if (existingUser) {
            console.log("User already exist")
            return res.status(500).json({ message: "User Already Exist" })
        }
        //Hasing password by adding some salt to it(bcrypt)
        const saltRounds = 10
        console.log("Hashing now")
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err)
            }
            await User.create({
                userName: name,
                userEmail: email,
                userPhone: phone,
                password: hash
            })
        })
        res.status(200).json({ message: "successfully created new user" })

    }
    catch (error) {
        res.status(500).json({ message: "User already Available" })

    }
}


//this is token secret
function generateAccessToken(id){
    return jwt.sign({userId:id},process.env.TOKEN_SECRET)
}


exports.postLoginForm=async(req,res,next)=>{
    try{
        console.log("login server data",req.body)
        const {email , password}=req.body

        //checking if user available
        const userAvailable = await User.findOne({where:{userEmail:email}})
        console.log("This user trying to login",userAvailable)

        if(userAvailable){
            //checking if password valid
            const isPasswordValid=await bcrypt.compare(password,userAvailable.password)
            if(isPasswordValid){
                console.log("Login Successful")
                return res.status(200).json({message:"Logged in",token:generateAccessToken(userAvailable.id)})
            }
            else{
                console.log("Password Wrong")
                res.status(401).json({message:"User not authorized"})

            }
        }
        else{
            console.log("User not found")
            res.status(404).json({message:"User not available with this email"})
        }
    }
    catch(error){
        console.log("error in server",error)
        res.status(500).json({message:"Internal error"})
    }
}

