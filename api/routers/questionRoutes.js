const { Router } = require('express')
const { getQuestion, submitAnswer } = require('../controllers/questionController')
const questionRouter = Router()

questionRouter.get('/', getQuestion)
questionRouter.post('/answer', submitAnswer)

module.exports = questionRouter