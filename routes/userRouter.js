const checkAuth = require("../middlewares/checkAuth");
const user = require("../controllers/user");
const Router = require("express").Router

const router = Router()

router.use(checkAuth({notAuthRedirect: "/login"}))
router.get("/", user.getAuthUser)
router.put("/", user.uploadPicture.single("photoFile"), user.updateAuthUser)

module.exports = router