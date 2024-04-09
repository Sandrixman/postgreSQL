const { Pool } = require("pg")

require("dotenv").config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const dropTableQuery = `
  DROP TABLE IF EXISTS scorelist
`
pool.query(dropTableQuery).then((result) => {
    console.log("Таблицю scorelist видалено")
})

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS scorelist (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    score VARCHAR(100) UNIQUE
  )
`

pool.query(createTableQuery).then((result) => {
    console.log("Таблицю scorelist створено успішно")
})

module.exports = pool
