const express = require("express")
const cors = require("cors")
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
const userRouter = require("./routes/userRouter");
const logoutRouter = require("./routes/logoutRouter")

const helmet = require("helmet")

const app = express()

//Config
dotenv.config({path: "keys.env"})
database.initialize()
passportConfig.initialize(passport)

//Middlewares
app.use(helmet())
const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret: process.env.SESSION_SECRET, resave: false}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(express.static("pictures"))

//Routes
app.use("/login", loginRouter)
app.use("/oauth2", oauth2Router)
app.use("/user", userRouter)
app.use("/logout", logoutRouter)

app.post("/register", checkNotAuth({authRedirect: "/"}), register.createUser)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})

