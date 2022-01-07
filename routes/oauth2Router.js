const passport = require("passport")
const checkNotAuth = require("../middlewares/checkNotAuth");
const jwt = require("jsonwebtoken");
const Router = require("express").Router
const router = Router()

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

                    return res.status(200).cookie("jwt", token).redirect("http://localhost:3000/")
            }
        )
}

router.use(checkNotAuth({authRedirect: "/"}))

router.get("/redirect/google", passport.authenticate("google"), createAndSendJwt)

module.exports = router