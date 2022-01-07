const checkAuth = require("../middlewares/checkAuth");
const Router = require("express").Router

const router = Router()

router.use(checkAuth({notAuthRedirect: "/login"}))


module.exports = router