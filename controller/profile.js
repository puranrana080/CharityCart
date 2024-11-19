const path=require('path')

exports.getUserProfilePage=async (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public/views/profile.html'))



}