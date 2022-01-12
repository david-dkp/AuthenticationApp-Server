const bcrypt = require("bcrypt")
const User = require("../models/User");
const FederatedCredential = require("../models/FederatedCredential");
const schedule = require("node-schedule")

//Strategies
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const CustomStrategy = require("passport-custom").Strategy

const ExtractJwt = require("passport-jwt").ExtractJwt


const handleProviderLogin = async (provider, profile, cb) => {
    try {
        const federatedCredential = await FederatedCredential.findOne({
            where: {
                provider: provider,
                subject: profile.id
            }
        })

        if (!federatedCredential) {
            let newUser = await User.findOne({where: {email: profile.emails[0].value}})

            if (!newUser) {
                newUser = await User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName ?? "Anonymous",
                    profilePicturePath: "default_profile_picture.jpg",
                })
            }

            await FederatedCredential.create({userId: newUser.id, provider: provider, subject: profile.id})
            cb(null, newUser.toJSON())
        } else {
            let user = await User.findOne({where: {id: federatedCredential.userId}})

            if (!user) {
                user = await User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName ?? "Anonymous",
                    profilePicturePath: "default_profile_picture.jpg",
                })
            }
            cb(null, user.toJSON())
        }
    } catch (e) {
        cb(e)
    }
}

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
            return done(null, user.toJSON())
        } catch (e) {
            done(e)
        }
    }))

    passport.use(new GoogleStrategy({
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
            callbackURL: process.env.SERVER_URL + "/oauth2/redirect/google",
            scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"]
        },
        async (accessToken, refreshToken, profile, cb) => handleProviderLogin("https://google.com", profile, cb)))

    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + "/oauth2/redirect/github",
        scope: ['user:email']
    }, (accessToken, refreshToken, profile, cb) => handleProviderLogin("https://github.com", profile, cb)))

    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET
    }

    passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
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

    passport.use("guess", new CustomStrategy(async (req, cb) => {

        try {
            const name = "Guest"+(Math.round(Math.random() * 5000)).toString()
            const user = await User.create({
                name,
                profilePicturePath: "default_profile_picture.jpg",
                isGuess: true,
            })

            const deleteDate = new Date(user.createdAt)
            deleteDate.setDate(deleteDate.getDate() + 1)

            schedule.scheduleJob(deleteDate, async () => {
                await user.destroy()
            })

            cb(null, user.toJSON())
        } catch (e) {
            cb(e)
        }

    }))

    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (obj, done) {
        done(null, obj)
    })
}

module.exports.initialize = initialize