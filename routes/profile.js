const express = require('express')
const router = express.Router()
const profileController = require('../controller/profile')
const userAuthentication = require('../middleware/auth')

router.get('/profile',profileController.getUserProfilePage)


module.exports = router