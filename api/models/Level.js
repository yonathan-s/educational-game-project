const db = require('../database/connect')

class Level {
	constructor({ id, level_number, level_name }) {
		this.id = id
		this.level_number = level_number
		this.level_name = level_name
	}

	static async getAll() {
		const response = await db.query("SELECT * FROM levels")
		if (response.rows.length === 0){
			throw new Error("No levels available.")
		}
		return response.rows.map(l => new Level(l))
	}

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM levels WHERE id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate level.")
        }
        return new Level(response.rows[0]);
    }
}

module.exports = Level