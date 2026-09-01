const Level = require('../models/Level')

async function index (req, res) {
	try {
		const levels = await Level.getAll()
		res.status(200).json(levels)
	} catch (err) {
		res.status(500).json({"error": err.message})
	}
}

module.exports = { index }