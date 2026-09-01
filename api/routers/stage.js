const { Router } = require('express')

const stageController = require('../controllers/stage')

const stageRouter = Router()

stageRouter.get('/:id', stageController.show)

module.exports = stageRouter