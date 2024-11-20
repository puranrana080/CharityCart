const express=require('express')
const router = express.Router()
const userAuthentication = require('../middleware/auth')
const charityController =require('../controller/charity')

// router.get('/charity',charityController.getCharityForm)

router.post('/charity/create',userAuthentication.authenticate,charityController.postCreateCharity)

router.get('/cherities',userAuthentication.authenticate,charityController.getAllCampaigns)

router.get('/charity/my-charity',userAuthentication.authenticate,charityController.getMyCampaigns)

router.get('/charity/:charityId/profile',userAuthentication.authenticate,charityController.getCharityById)

module.exports= router  
