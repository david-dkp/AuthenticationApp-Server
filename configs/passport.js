const bcrypt = require("bcrypt")
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy

const initialize = (passport) => {
    passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"}, async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email}})
            if (!user) {
                return done(null, false, {message: "Incorrect email."})
            }
            const verified = password === user.password//await bcrypt.compare(password, user.password)
            if (!verified) return done(null, false, {message: "Incorrect password."})
            return done(null, user)
        } catch (e) {
            done(e)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            done(null, await User.findByPk(id))
        } catch(e) {
            done(e, false)
        }
    })
}

module.exports.initialize = initialize