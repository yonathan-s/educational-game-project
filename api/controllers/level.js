const Level = require('../models/Level')
const Stage = require('../models/Stage')

async function index (req, res) {
	try {
		const levels = await Level.getAll()
		res.status(200).json(levels)
	} catch (err) {
		res.status(500).json({"error": err.message})
	}
}

async function showLevel (req, res) {
    try {
        const id = parseInt(req.params.id)
        const level = await Level.getOneById(id)
        res.status(200).json(level)
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function showStages (req, res) {
	try {
		const level_id = parseInt(req.params.id)
		const stages = await Stage.getByLevelId(level_id)
		res.status(200).json(stages)
	} catch (err) {
		res.status(404).json({"error": err.message})
	}
}
module.exports = { index, showLevel, showStages}