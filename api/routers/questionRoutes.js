const { Router } = require('express')
const { getQuestion } = require('../controllers/questionController')
const questionRouter = Router()

questionRouter.get('/', getQuestion)

module.exports = questionRouter