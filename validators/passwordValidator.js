const Schema = require("password-validator");

const passwordSchema = new Schema()
passwordSchema
    .is().min(6)
    .is().max(18)
    .has().digits(1)

module.exports.validate = passwordSchema.validate