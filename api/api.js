const express = require('express')
const questionRouter = require('./routers/questionRoutes')
const api = express()
api.use(express.json())
api.use('/questions', questionRouter)


module.exports = api