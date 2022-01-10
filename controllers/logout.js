const logout = (req, res) => {
    req.logout()
    req.session.destroy()
    return res.status(200).clearCookie("jwt").json({
        type: "success"
    })
}

module.exports = logout