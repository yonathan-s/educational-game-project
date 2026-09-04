const { Router } = require('express')
const { getQuestion, submitAnswer } = require('../controllers/questionController')
const authenticator = require('../middleware/authenticator')
const questionRouter = Router()

questionRouter.get('/', authenticator, getQuestion)
questionRouter.post('/answer', authenticator, submitAnswer)

module.exports = questionRouter