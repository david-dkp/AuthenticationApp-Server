const Schema = require("password-validator");

const passwordSchema = new Schema()
passwordSchema
    .is().min(6)
    .is().max(18)
    .has().digits(1)

function validate(password) {
    return passwordSchema.validate(password)
}

module.exports.validate = validate