const fs = require('fs')
require('dotenv').config()

const db = require('./connect')

const sql = fs.readFileSync('./database/setup.sql').toString()
const seedSql = fs.readFileSync('./database/seed.sql').toString()

db.query(setupSql)
    .then(() => {
        return db.query(seedSql)
    })
    .then(() => {
        db.end()
        console.log("Set-up and seed complete.")
    })
    .catch(error => console.log(error))