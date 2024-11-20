const path=require('path')
const User= require('../model/user')

exports.getUserProfilePage=async (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public/views/profile.html'))



}

exports.getUserProfileDetails=async(req,res,next)=>{
    try{
        console.log("In server checking for user details ")
        const user= await User.findByPk(req.user.id)
        console.log("user detail",user)
        res.status(200).json({message:"detail fetched",user})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Unabel to get user details in server "})
    }
}

exports.postUpdateProfile=async(req,res,next)=>{
    const {name,phone} =req.body

    try{
        const userId=req.user.id

        const result=await User.update({
            userName:name,
            userPhone:phone
        },{where:{id:userId}})
        

        res.status(200).json({ message: "Profile updated successfully" });


    }
    catch(error){
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "error while updating the profile", error })

    }



}