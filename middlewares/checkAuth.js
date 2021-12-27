const checkAuth = ({notAuthRedirect}) => (req, res, next) => {
    if (!req.user) {
        if (notAuthRedirect) {
            res.redirect(notAuthRedirect)
        }
    } else {
        next()
    }
}

module.exports = checkAuth