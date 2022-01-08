const User = require("../models/User");
const {getStaticUrlFromPath} = require("../utils/fileUtils");
const emailValidator = require("email-validator")
const passwordValidator = require("../validators/passwordValidator")


const getAuthUser = async (req, res) => {
    const allowedAttributes = ["id", "name", "bio", "phoneNumber", "email", "profilePicturePath"]

    try {
        const data = await User.findByPk(req.user.id, {attributes: allowedAttributes})

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

        await User.update(updateUser, {
            fields: ["name", "email", "password", "bio", "phoneNumber", "profilePicturePath"]
        })
        res.status(200).json({type: "success"})
    } catch (e) {
        res.status(500).json({type: "error", message: "Something went wrong, please try again"})
    }
}

module.exports = {
    getAuthUser,
    updateAuthUser
}