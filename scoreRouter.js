const express = require("express")
const scoreRouter = express.Router()
const pool = require("./pool")

scoreRouter.get("/score", (req, res) => {
    pool.query("SELECT * FROM scorelist")
        .then((result) => {
            res.json(result.rows)
        })
        .catch((error) => {
            console.error("Error executing query", error)
            res.status(500).send("Internal Server Error")
        })
})

scoreRouter.post("/score", (req, res) => {
    const { name, score } = req.body

    const insertQuery = {
        text: "INSERT INTO scorelist(name, score) VALUES($1, $2)",
        values: [name, score],
    }

    pool.query(insertQuery)
        .then((result) => {
            res.status(201).send("Player added successfully")
        })
        .catch((error) => {
            console.error("Error executing query", error)
            res.status(500).send("Internal Server Error")
        })
})

module.exports = scoreRouter
