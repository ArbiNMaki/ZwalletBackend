const express = require('express')
const router = express.Router()
const {loginUser,sendEmail} = require('../controllers/authController')

router
.post('/login',loginUser)
.post('/email',sendEmail)
module.exports = router