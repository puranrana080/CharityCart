const Charity=require('../model/charity')
const path=require('path')


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

exports.getAllCampaigns=async(req,res,next)=>{
    try{
        const cherities=await Charity.findAll({where:{isApproved:true}})
console.log("server charities",cherities)
res.status(200).json({message:"received all ",cherities})
    }
    catch(error){
        console.log("server",error)
        res.status(500).json({message:"error",error})
    }
}


exports.getMyCampaigns=async(req,res,next)=>{
    try{
        const myCharity=await Charity.findAll({where:{userId:req.user.id}})
        console.log("mycharity server",myCharity)
res.status(200).json({message:"Got mycharity",myCharity})
    }
    catch(error){
        console.log("server",error)
        res.status(500).json({message:"server error",error})
    }

}


exports.getCharityById=async(req,res,next)=>{
   
    const {charityId}=req.params
    console.log("THIS ISSSS",charityId)
    try{

        const charity=await Charity.findByPk(charityId)

        res.status(200).json({message:"charity with user found",charity})

    }
    catch(err){
        console.log("ERR in server by id")
        res.status(500).json({message:"charity not found wwith id",err})
    }

}