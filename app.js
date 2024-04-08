const express = require("express")
const cors = require("cors")
const scoreRouter = require("./scoreRouter")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(scoreRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app
