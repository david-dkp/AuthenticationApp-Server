const checkAuth = ({notAuthRedirect}) => (req, res, next) => {
    if (!req.user) {
        res.status(401)
        if (notAuthRedirect) {
            res.redirect(notAuthRedirect)
        } else {
            res.json({error: "User must be auth"})
        }
    } else {
        next()
    }
}

module.exports = checkAuth