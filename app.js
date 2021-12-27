const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const database = require("./configs/database")
const passport = require("passport")
const passportConfig = require("./configs/passport")

const app = express()

//Config
dotenv.config()
database.initialize()
passportConfig.initialize(passport)

app.use(session({secret: "secret"}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

app.post("/login", passport.authenticate("local", { failureRedirect: "/login"}), (req, res) => {
    res.send("Yeah")
})

app.get("/login", (req, res) => res.send("/login is not awake"))

app.get("/", (req, res) => {
    return res.send("Yeah")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})