const db = require('../database/connect');

class User {

    constructor({username, password_hash }) {
        this.username = username;
        this.password_hash = password_hash;
    }

    static async create(data) {
        const { username, password_hash } = data;
        let response = await db.query("INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *;", [username, password_hash]);
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

}

module.exports = User;