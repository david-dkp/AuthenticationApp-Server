const emailValidator = require("email-validator")
const Schema = require("password-validator")
const User = require("../models/User");
const bcrypt = require("bcrypt")

const passwordSchema = new Schema()
    .is().min(6)
    .is().max(18)
    .has().digits(1)

const passwordErrorMessage = "Passport must be between 6 and 18 in length, and must contain at least 1 digit."

const createUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({error: "'email' or 'password' fields are missing"})

    const cleanEmail = email.trim()
    const cleanPassword = password.trim()

    const exists = await User.findOne({where: {email: cleanEmail}})

    if (exists) return res.status(200).json({error: "The account already exists."})

    const emailValid = emailValidator.validate(email)
    const passwordValid = passwordSchema.validate(cleanPassword)

    if (!emailValid || !passwordValid) {
        return res.status(200).json({
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