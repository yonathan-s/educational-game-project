const db = require('../database/connect')

class Level {
	constructor({ id, level_number, level_name }) {
		this.id = id
		this.level_number = level_number
		this.level_name = level_name
	}

	static async getAll() {
		const response = await db.query("SELECT * from levels")
		return response.rows.map(l => new Level(l))
	}
}