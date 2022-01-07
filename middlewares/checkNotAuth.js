const passport = require("passport");
const jwt = require("jsonwebtoken")

const checkNotAuth = ({authRedirect}) => (req, res, next) => {
    const token = req.headers["Authorization"]
    if (!token) {
        return next()
    }

    jwt.verify(token, "secret", {algorithm: 'HS256'}, (err, decoded) => {
        if (err || !decoded) {
            return next()
        }

        res.status(401)
        if (authRedirect) {
            res.redirect(authRedirect)
        }
    })
}

module.exports = checkNotAuth