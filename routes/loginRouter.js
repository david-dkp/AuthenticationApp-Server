const checkNotAuth = require("../middlewares/checkNotAuth");
const passport = require("passport");
const Router = require("express").Router
const jwt = require("jsonwebtoken")
const createAndSendJwt = require("../middlewares/createAndSendJwt");
const router = Router()

router.use(checkNotAuth({authRedirect: "/"}))

router.post("/", passport.authenticate("local", {session: false}), createAndSendJwt())
router.post("/guess", passport.authenticate("guess"), createAndSendJwt({expiresIn: 60 * 60 * 24}))
router.get("/google", passport.authenticate("google"))
router.get("/github", passport.authenticate("github", {scope: ['user:email', "read:user"]}))

module.exports = router