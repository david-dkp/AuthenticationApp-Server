const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const database = require("./configs/database")
const passport = require("passport")
const passportConfig = require("./configs/passport")
const register = require("./controllers/register")
const checkNotAuth = require("./middlewares/checkNotAuth");
const oauth2Router = require("./routes/oauth2Router");
const loginRouter = require("./routes/loginRouter")

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

//Routes
app.use("/login", loginRouter)
app.use("/oauth2", oauth2Router)

app.post("/register", checkNotAuth({authRedirect: "/"}), register.createUser)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

