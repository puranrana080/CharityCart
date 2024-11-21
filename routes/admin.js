const express = require('express')
const router = express.Router()

const userAuthentication=require('../middleware/auth')
const adminController = require('../controller/admin')
const adminAuthenticator=require('../middleware/adminAuth')



router.get('/admin/dashboard',adminController.getAdminDashboardPage)

router.get('/admin/getDashboardData',userAuthentication.authenticate, adminAuthenticator.adminAuth,adminController.getAdminDashboardData)

router.post('/admin/promoteUser/:id', adminController.promoteUser)

router.post('/admin/approveCharity/:id',  adminController.approveCharity)

router.post('/admin/rejectCharity/:id',adminController.rejectCharity)




module.exports = router