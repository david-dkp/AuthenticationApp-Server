const path = require("path")
const User = require("../models/User")
const multer = require("multer")
const {getStaticUrlFromPath} = require("../utils/fileUtils");

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "pictures"))
    },
    filename: function (req, file, cb) {
        if (!req.user.id) {
            return cb(new Error("The user is not authenticated"))
        }
        cb(null, req.user.id.toString() + "profile_picture" + path.extname(file.originalname))
    }
})

const upload = multer({storage: userStorage})

const uploadPicture = upload.single("photoFile")

const getUser = async (req, res) => {
    if (!req.params.id) return res.status(400)
    if (req.params.id !== req.user.id) return res.status(401)

    const properUserAllowedAttributes = ["id", "name", "bio", "profilePicturePath", "phoneNumber", "email", "passwordLength"]
    const foreignUserAllowedAttributes = ["id", "name", "bio", "profilePicturePath"]

    const allowedAttributes = req.params.id === req.user.id ? properUserAllowedAttributes : foreignUserAllowedAttributes

    try {
        const data = await User.findByPk(req.params.id, {attributes: allowedAttributes})

        const user = data.toJSON()

        if (user.profilePicturePath !== null || user.profilePicturePath !== "") {
            user.photoUrl = getStaticUrlFromPath(user.profilePicturePath)
        }

        delete user.profilePicturePath

        return res.status(200).json(user)
    } catch (e) {
        return res.status(500)
    }
}

const updateUser = async (req, res) => {
    try {
        const updateUser = req.body
        if (req.file) {
            updateUser.profilePicturePath = req.file.path
        }
        await User.update( updateUser, {
            fields: ["name", "email", "password", "bio", "phoneNumber", "profilePicturePath"]
        })
        res.status(200).json({type: "success"})
    } catch (e) {
        res.status(500).json({type: "error", message: "Something went wrong, please try again"})
    }
}

module.exports = {
    uploadPicture,
    getUser,
    updateUser
}