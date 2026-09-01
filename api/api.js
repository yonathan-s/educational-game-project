const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger') 

const userRouter = require("./routers/user")

const api = express()

api.use(cors())
api.use(express.json())
api.use(logRoutes)

api.use("/users", userRouter)

module.exports = api;