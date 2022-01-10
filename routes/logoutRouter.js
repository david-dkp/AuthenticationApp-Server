const checkAuth = require("../middlewares/checkAuth");
const logout = require("../controllers/logout")
const Router = require("express").Router

const router = Router()

router.use(checkAuth({notAuthRedirect: "/login"}))

router.post("/", logout)

module.exports = router