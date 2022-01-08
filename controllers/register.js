const emailValidator = require("email-validator")
const User = require("../models/User");
const bcrypt = require("bcrypt")
const passwordValidator = require("../validators/passwordValidator");

const passwordErrorMessage = "Passport must be between 6 and 18 in length, and must contain at least 1 digit."

const createUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({type: "error", message: "'email' or 'password' fields are missing"})

    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    const exists = await User.findOne({where: {email: cleanEmail}})

    if (exists) return res.status(200).json({type: "error", message: "The account already exists."})

    const emailValid = emailValidator.validate(email)
    const passwordValid = passwordValidator.validate(cleanPassword)

    if (!emailValid || !passwordValid) {
        return res.status(200).json({
            type: "error",
            message: "Invalid inputs",
            error: {
                email: emailValid ? null : "The email must be in a correct format",
                password: passwordValid ? null : passwordErrorMessage
            }
        })
    }

    try {
        const newUser = User.build({email: cleanEmail, password: await bcrypt.hash(cleanPassword, 5)})
        await newUser.save()
        return res.status(201).redirect("/login")
    } catch(e) {
        return res.status(500).json({error: "Something went wrong on the server"})
    }
}

module.exports.createUser = createUser