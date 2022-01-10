const checkNotAuth = require("../middlewares/checkNotAuth");
const passport = require("passport");
const Router = require("express").Router
const jwt = require("jsonwebtoken")
const createAndSendJwt = require("../middlewares/createAndSendJwt");
const router = Router()

router.use(checkNotAuth({authRedirect: "/"}))

router.post("/", passport.authenticate("local", {session: false}), createAndSendJwt)

router.get("/google", passport.authenticate("google", {session: false, scope: ["email", "profile"]}))


module.exports = router