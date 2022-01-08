const checkNotAuth = require("../middlewares/checkNotAuth");
const passport = require("passport");
const Router = require("express").Router
const jwt = require("jsonwebtoken")
const router = Router()

router.use(checkNotAuth({authRedirect: "/"}))

const createAndSendJwt = (req, res) => {
    jwt.sign(
        {userId: req.user.id},
        "secret",
        {algorithm: 'HS256'},
        (err, token) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    type: "Error",
                    message: "Something went wrong, please try again"
                })
            }

            return res.status(200).cookie("jwt", token).redirect("/")
        }
    )
}

router.post("/", passport.authenticate("local", {session: false}), createAndSendJwt)

router.get("/google", passport.authenticate("google", {session: false, scope: ["email", "profile"]}))


module.exports = router