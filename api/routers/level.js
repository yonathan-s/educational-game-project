const { Router } = require('express')

const levelController = require('../controllers/level')

const levelRouter = Router()

levelRouter.get('/', levelController.index)
levelRouter.get('/:id', levelController.showLevel)
levelRouter.get('/:id/stages', levelController.showStages)

module.exports = levelRouter