const express = require('express')
const router = express.Router()
const authorizationMiddleware = require('../middleware/auth')

const {postUserData, loginTheUser} = require('../controllers/signupControllers')

router.post('/', postUserData)

router.post('/loginTheUser', loginTheUser)



module.exports = router