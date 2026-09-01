const db = require('../database/connect')

class Stage {
	constructor({ id, level_id, stage_number, stage_name }) {
		this.id = id
		this.level_id = level_id
		this.stage_number = stage_number
		this.stage_name = stage_name
	}

	static async getById(id) {
		const response = await db.query("SELECT * FROM stages WHERE id = $1", [id])
		if (response.rows.length != 1) {
			throw new Error("Unable to locate stage.")
		}
		return new Stage(response.rows[0])
	}
}