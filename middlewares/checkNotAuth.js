const checkNotAuth = ({authRedirect}) => (req, res, next) => {
    if (req.user) {
        res.status(401)
        if (authRedirect) {
            res.redirect(authRedirect)
        } else {
            res.json({error: "User must no be auth"})
        }
    } else {
        next()
    }
}

module.exports = checkNotAuth