const passport = require("passport")
const checkNotAuth = require("../middlewares/checkNotAuth");
const jwt = require("jsonwebtoken");
const createAndSendJwt = require("../middlewares/createAndSendJwt");
const Router = require("express").Router
const router = Router()


router.use(checkNotAuth({authRedirect: "/"}))

router.get("/redirect/google", passport.authenticate("google"), createAndSendJwt())

router.get("/redirect/github", passport.authenticate("github"), createAndSendJwt())

module.exports = router