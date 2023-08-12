const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/userController')
const { authMiddleware } = require('../middleware/userMiddlerware')

userRouter.get('/', authMiddleware,UserController.getAllUser)
userRouter.post('/', UserController.store)
userRouter.get('/:id', UserController.findById)
userRouter.put('/:id', UserController.update)
userRouter.delete('/:id', UserController.destroy)

module.exports = userRouter