const express = require('express');
const cors = require('cors');
const questionRouter = require('./routers/questionRoutes')
const logRoutes = require('./middleware/logger') 

const userRouter = require("./routers/user")

const api = express()

api.use(cors())
api.use(express.json())
api.use(logRoutes)

api.use("/users", userRouter)
api.use('/questions', questionRouter)
module.exports = api;

