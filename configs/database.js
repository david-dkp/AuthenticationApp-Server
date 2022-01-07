const { Sequelize } = require("sequelize")
const User = require("../models/User")
const FederatedCredential = require("../models/FederatedCredential")
const Room = require("../models/Room");
const Member = require("../models/Member");

const initialize = async () => {
    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "databases/database.sqlite",
        logging: false,
    })
    await sequelize.authenticate()

    //Init models
    User.initModel(sequelize)
    FederatedCredential.initModel(sequelize)
    Room.initModel(sequelize)
    Member.initModel(sequelize)

    await sequelize.sync()
}
module.exports.initialize = initialize;