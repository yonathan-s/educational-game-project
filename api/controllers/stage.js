const Stage = require('../models/Stage')

async function show (req, res) {
	try {
        const id = parseInt(req.params.id)
        const stage = await Stage.getOneById(id)
        res.status(200).json(stage)
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = { show }