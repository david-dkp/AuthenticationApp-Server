const {Sequelize} = require("sequelize")
const User = require("../models/User")
const FederatedCredential = require("../models/FederatedCredential")
const path = require("path");

const initialize = async () => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(process.cwd(), "databases/database.sqlite"),
        logging: false,
    })
    await sequelize.authenticate()

    //Init models
    User.initModel(sequelize)
    FederatedCredential.initModel(sequelize)

    await sequelize.sync()
}
module.exports.initialize = initialize;