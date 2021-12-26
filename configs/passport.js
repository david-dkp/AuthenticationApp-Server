const Passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const initialize = (passport) => {
    passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {

    }))
}