const fs = require('fs')
require('dotenv').config()

const db = require('./connect')

const setupSql = fs.readFileSync('./database/setup.sql').toString()

db.query(setupSql)
    .then(data => {
        db.end()
        console.log("Setup complete");
    })
    .catch(error => console.log(error))
