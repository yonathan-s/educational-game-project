const express = require('express');
const cors = require('cors');
const questionRouter = require('./routers/questionRoutes')
const levelRouter = require('./routers/level')
const stageRouter = require('./routers/stage')
const logRoutes = require('./middleware/logger') 

const userRouter = require("./routers/user")

const api = express()

api.use(cors())
api.use(express.json())
api.use(logRoutes)

api.use("/users", userRouter)
api.use('/questions', questionRouter)
api.use('/levels', levelRouter)
api.use('/stages', stageRouter)
module.exports = api;

