const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const database = require("./configs/database")
const passport = require("passport")
const passportConfig = require("./configs/passport")
const register = require("./controllers/register")
const checkNotAuth = require("./middlewares/checkNotAuth");
const oauth2Router = require("./routes/oauth2Router");
const loginRouter = require("./routes/loginRouter")
const usersRouter = require("./routes/usersRouter");
const userRouter = require("./routes/userRouter");

const helmet = require("helmet")

const app = express()

//Config
dotenv.config({path: "keys.env"})
database.initialize()
passportConfig.initialize(passport)

//Middlewares
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "secret"}))
app.use(passport.initialize())
app.use(helmet())
app.use(express.static("pictures"))

//Routes
app.use("/login", loginRouter)
app.use("/oauth2", oauth2Router)
app.use("/users", usersRouter)
app.use("/user", userRouter)

app.post("/register", checkNotAuth({authRedirect: "/"}), register.createUser)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

