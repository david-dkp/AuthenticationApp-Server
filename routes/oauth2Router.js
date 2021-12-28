const passport = require("passport")
const checkNotAuth = require("../middlewares/checkNotAuth");
const Router = require("express").Router
const router = Router()


router.use(checkNotAuth({authRedirect: "/"}))

router.get("/redirect/google", passport.authenticate("google"), (req, res) => {
        res.status(200).redirect("http://localhost:3000/")
})

module.exports = router