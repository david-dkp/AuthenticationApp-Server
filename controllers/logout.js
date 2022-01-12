const User = require("../models/User");


const logout = async (req, res) => {
    if (req.user.isGuess) {
        await User.destroy({where: {id: req.user.id}})
    }
    req.logout()
    req.session.destroy()
    return res.status(200).clearCookie("jwt").json({
        type: "success"
    })
}

module.exports = logout