const path = require('path')
const User = require('../model/user')
const Charity = require('../model/charity')

exports.getAdminDashboardPage = async (req, res, next) => {
    try{

    res.sendFile(path.join(__dirname, '../public/views/admin.html'))
    }
    catch(error){
        res.status(403).json({message:"You are not authorized"})
    }

}

exports.getAdminDashboardData = async (req, res, next) => {
    try {
        const adminUsers = await User.findAll({ where: { role: 'Admin' } })
        const charities = await Charity.findAll({
            where: { isApproved: false },
            include: [{ model: User, attributes: ['userName'] }]
        })
        const users = await User.findAll({ where: { role: 'user' } })
        res.status(200).json({ adminUsers, charities, users })
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching data for admin', error: error });
    }


}

exports.promoteUser = async (req, res, nexr) => {
    const id = req.params.id
    console.log("Hi  hajhbsdjbsd")
    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        user.role = "Admin"
        await user.save()
        res.status(200).json({ message: 'User Promoted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error promoting user', error })
    }
}

exports.approveCharity = async (req, res, next) => {
    const id=req.params.id
    try{
        const charity=await Charity.findByPk(id)
        if(!charity){
            return res.status(404).json({message:"charity not found"})
        }
        charity.isApproved=true
        await charity.save()
    
    res.status(200).json({message:"Charity approved"})
    }
    catch(err){
        res.status(500).json({message:"Error approving charity",err})
    }

}

exports.rejectCharity = async (req, res, next) => {
    const id =req.params.id
    try{
        const charity=await Charity.findByPk(id)
        await charity.destroy()
        res.status(200).json({ message: 'Charity rejected and deleted successfully' });

    }
    catch(error){
        res.status(500).json({ message: 'Error in rejecting charity', error });
    }

}