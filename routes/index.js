const express = require('express');
const router = express.Router();
const userRouter = require('./user') //import route user
const authRouter = require('./auth') 

//user routing
router.use('/auth',authRouter)
router.use('/users',userRouter)

module.exports = router