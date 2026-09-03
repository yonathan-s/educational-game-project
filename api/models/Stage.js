const db = require('../database/connect')

class Stage {
	constructor({ id, level_id, stage_number, stage_name, points }) {
		this.id = id
		this.level_id = level_id
		this.stage_number = stage_number
		this.stage_name = stage_name
		this.points = points
	}

	static async getOneById(id) {
		const response = await db.query("SELECT * FROM stages WHERE id = $1", [id])
		if (response.rows.length != 1) {
			throw new Error("Unable to locate stage.")
		}
		return new Stage(response.rows[0])
	}

	static async getByLevelId(level_id) {
		const response = await db.query("SELECT * FROM stages WHERE level_id = $1 ORDER BY stage_number ASC", [level_id])
		if (response.rows.length === 0) {
			throw new Error("Unable to locate stages for this specific level.")
		}

		return response.rows.map(s => new Stage(s))
	}

	static async getNextStage(level_id, stage_number) {
		const response = await db.query('SELECT id, stage_number FROM stages WHERE level_id = $1 AND stage_number = $2;', [level_id, stage_number+1])
		if (response.rows.length === 0) {
			throw new Error("Unable to locate the next stage for this specific level.")
		}
		return response.rows[0]
	}

	static async updateUserStage(user_id, level_id, nextStageId) {
		const response = await db.query('UPDATE user_progress SET current_stage_id = $1 WHERE user_id = $2 AND level_id = $3 RETURNING *;', [nextStageId, user_id, level_id])
		if (response.rows.length === 0) {
			throw new Error("Unable to update user with the next stage.")
		}
		return response.rows[0]
	}
}

module.exports = Stage