const jwt = require("jsonwebtoken");


const createAndSendJwt = (signingOptions={}) => {
    return (req, res) => {
        jwt.sign(
            {userId: req.user.id},
            process.env.JWT_SECRET,
            {algorithm: 'HS256', ...signingOptions},
            (err, token) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        type: "Error",
                        message: "Something went wrong, please try again"
                    })
                }

                return res.status(302).cookie("jwt", token).redirect(process.env.CLIENT_URL + "/")
            }
        )
    }
}

module.exports = createAndSendJwt