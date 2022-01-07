const bcrypt = require("bcrypt")
const User = require("../models/User");
const FederatedCredential = require("../models/FederatedCredential");

//Strategies
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oidc")
const JwtStrategy = require("passport-jwt").Strategy

const initialize = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email}})
            if (!user) {
                return done(null, false, {message: "Incorrect email."})
            }
            const verified = await bcrypt.compare(password, user.password)
            if (!verified) return done(null, false, {message: "Incorrect password."})
            return done(null, user)
        } catch (e) {
            done(e)
        }
    }))

    passport.use(new GoogleStrategy({
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
            callbackURL: 'http://localhost:' + process.env["PORT"] + "/oauth2/redirect/google"
        },
        async (issuer, profile, cb) => {
            try {
                const federatedCredential = await FederatedCredential.findOne({
                    where: {
                        provider: issuer,
                        subject: profile.id
                    }
                })

                if (!federatedCredential) {
                    let newUser = await User.findOne({where: {email: profile.emails[0].value}})

                    if (!newUser) {
                        newUser = await User.create({
                            profilePicturePath: profile.photos[0].value,
                            email: profile.emails[0].value,
                            name: profile.displayName
                        })
                    }

                    await FederatedCredential.create({userId: newUser.id, provider: issuer, subject: profile.id})
                    cb(null, newUser.toJSON())
                } else {
                    let user = await User.findOne({where: {id: federatedCredential.userId}})

                    if (!user) {
                        user = await User.create({
                            profilePicturePath: profile.photos[0].value,
                            email: profile.emails[0].value,
                            name: profile.displayName
                        })
                    }
                    cb(null, user.toJSON())
                }
            } catch (e) {
                cb(e)
            }
        }))

    passport.use(new JwtStrategy({}, async (payload, done) => {
        const userId = payload.userId

        try {
            const user = await User.findByPk(userId)

            if (!user) {
                return done(null, false)
            }

            return done(null, user.toJSON())
        } catch (e) {
            return done(e)
        }

    }))
}

module.exports.initialize = initialize