const passport = require("passport");


const checkAuth = ({notAuthRedirect}) => passport.authenticate("jwt", {
    failureRedirect: notAuthRedirect,
    session: false
})

module.exports = checkAuth