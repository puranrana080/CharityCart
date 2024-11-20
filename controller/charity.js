const Charity=require('../model/charity')
const path=require('path')

// exports.getCharityForm=async(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../public/views/new-charity.html'))
// }
console.log("Reached in controller")
exports.postCreateCharity=async(req,res,next)=>{
    try{
        console.log("charity form data",req.body)
        const charity = await Charity.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            category: req.body.category,
            goal: req.body.goal,
            userId: req.user.id, 
            });

        res.status(200).json({message:"Charity saved in db",charity})

    }
    catch(error){
        res.status(500).json({message:"error while saving in db",error})

    }

}