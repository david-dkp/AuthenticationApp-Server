const logout = (req, res) => {
   req.logout()
   req.session.destroy()
   return res.status(200).clearCookie("jwt").redirect("/login")
}

module.exports = logout