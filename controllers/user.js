const User = require("../models/User");
const {getStaticUrlFromPath} = require("../utils/fileUtils");
const emailValidator = require("email-validator")
const passwordValidator = require("../validators/passwordValidator")
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join("./pictures"))
    },
    filename: function (req, file, cb) {
        if (!req.user.id) {
            return cb(new Error("The user is not authenticated"))
        }
        cb(null, req.user.id.toString() + "_profile_picture" + path.extname(file.originalname))
    }
})

const upload = multer({storage: userStorage})

const uploadPicture = upload

const getAuthUser = async (req, res) => {
    try {
        const user = req.user
        delete user.password

        if (user.profilePicturePath && user.profilePicturePath !== "") {
            user.photoUrl = getStaticUrlFromPath(user.profilePicturePath)
            delete user.profilePicturePath
        }

        return res.status(200).json({type: "success", data: user})
    } catch (e) {
        return res.status(500).json({type: "error", message: "Something went wrong, please try again."})
    }
}

const passwordErrorMessage = "Passport must be between 6 and 18 in length, and must contain at least 1 digit."

const updateAuthUser = async (req, res) => {
    try {
        const updateUser = req.body

        if (req.file) {
            updateUser.profilePicturePath = req.file.path
        }

        let emailError;
        let passwordError;

        if (updateUser.email) {
            if (!emailValidator.validate(updateUser.email)) {
                emailError = "The email must be in a correct format"
            }
        }

        if (updateUser.password) {
            if (!passwordValidator.validate(updateUser.password)) {
                passwordError = passwordErrorMessage
            }
        }

        if (emailError || passwordError) {
            return res.status(400).json({
                type: "error", error: {
                    email: emailError ?? null,
                    password: passwordError ?? null
                }
            })
        }

        if (updateUser.password) {
            updateUser.password = await bcrypt.hash(updateUser.password, 5)
        }

        await User.update(updateUser, {
            where: {id: req.user.id},
            fields: ["name", "email", "password", "bio", "phoneNumber", "profilePicturePath"]
        })
        res.status(200).json({type: "success"})
    } catch (e) {
        res.status(500).json({type: "error", message: "Something went wrong, please try again"})
    }
}

module.exports = {
    getAuthUser,
    updateAuthUser,
    uploadPicture
}