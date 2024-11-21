const express=require('express')
const router = express.Router()
const userAuthentication = require('../middleware/auth')
const charityController =require('../controller/charity')

// router.get('/charity',charityController.getCharityForm)

router.post('/charity/create',userAuthentication.authenticate,charityController.postCreateCharity)

router.get('/cherities',userAuthentication.authenticate,charityController.getAllCampaigns)

router.get('/charity/my-charity',userAuthentication.authenticate,charityController.getMyCampaigns)

router.get('/charity/:charityId/profile',userAuthentication.authenticate,charityController.getCharityById)

router.post('/charity/:charityId/donate',userAuthentication.authenticate,charityController.donateToCharity)

router.post('/charity/donate/updateDonationStatus',userAuthentication.authenticate,charityController.updateDonationStatus)

router.post('/charity/donate/failedDonationStatus',userAuthentication.authenticate,charityController.updateDonationToFailed)

module.exports= router  
