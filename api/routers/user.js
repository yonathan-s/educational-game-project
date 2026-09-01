const { Router } = require('express');
const userController = require('../controllers/user')

const userRouter = Router();

userRouter.post('/register', userController.register)

module.exports = userRouter