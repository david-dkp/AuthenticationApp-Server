const checkAuth = require("../middlewares/checkAuth");
const Router = require("express")
const users = require("../controllers/users");
const router = Router()

router.use(checkAuth({notAuthRedirect: "/login"}))

router.get("/:id", users.getUser)

router.put("/", users.uploadPicture, users.updateUser)

module.exports = router