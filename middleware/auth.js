const jwt= require('jsonwebtoken')
const User=require('../model/user')
require('dotenv').config()

const authenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log("This is token",token)

        const user = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(user.userId)
        User.findByPk(user.userId)
        .then(user=>{
            req.user=user
            next()
        })
        .catch(err=>{
            throw new Error(err)
        })


    }
    catch(error){
        console.log("jwt error",error)
    }
}

module.exports={authenticate}