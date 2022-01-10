const jwt = require("jsonwebtoken");


const createAndSendJwt = (req, res) => {
    jwt.sign(
        {userId: req.user.id},
        process.env.JWT_SECRET,
        {algorithm: 'HS256'},
        (err, token) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    type: "Error",
                    message: "Something went wrong, please try again"
                })
            }

            return res.status(200).cookie("jwt", token).redirect(process.env.CLIENT_URL+"/")
        }
    )
}

module.exports = createAndSendJwt