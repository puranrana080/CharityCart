const express=require('express')
const router = express.Router()
const userAuthentication = require('../middleware/auth')
const charityController =require('../controller/charity')

// router.get('/charity',charityController.getCharityForm)
console.log("Reached in router")
router.post('/charity/create',userAuthentication.authenticate,charityController.postCreateCharity)

module.exports= router  
