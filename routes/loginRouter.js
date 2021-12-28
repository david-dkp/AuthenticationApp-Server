const checkNotAuth = require("../middlewares/checkNotAuth");
const passport = require("passport");
const Router = require("express").Router

const router = Router()

router.use(checkNotAuth({authRedirect: "/"}))

router.post("/", checkNotAuth({authRedirect: "/"}), passport.authenticate("local"), (req, res) => {
    res.status(200).redirect("/")
})

router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}))


module.exports = router