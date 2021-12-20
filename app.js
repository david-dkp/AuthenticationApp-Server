const express = require("express")
const dotenv = require("dotenv")
const database = require("./configs/database")

const app = express()

//Config
dotenv.config()
database.initialize()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})