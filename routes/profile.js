const express = require('express')
const router = express.Router()
const profileController = require('../controller/profile')
const userAuthentication = require('../middleware/auth')

router.get('/profile',profileController.getUserProfilePage)

router.get('/profile/userDetails',userAuthentication.authenticate,profileController.getUserProfileDetails)

router.post('/profile/editProfile',userAuthentication.authenticate,profileController.postUpdateProfile)

router.get('/profile/getMyDonations',userAuthentication.authenticate,profileController.getMyDonationDetails)

module.exports = router