const checkNotAuth = ({authRedirect}) => (req, res, next) => {
    if (req.user) {
        if (authRedirect) {
            res.redirect(authRedirect)
        }
    } else {
        next()
    }
}

module.exports = checkNotAuth