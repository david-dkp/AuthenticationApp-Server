const {Model, DataTypes} = require("sequelize")

class User extends Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.TEXT,
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: DataTypes.TEXT,
            },
            bio: {
                type: DataTypes.TEXT
            },
            phoneNumber: {
                type: DataTypes.TEXT
            },
            profilePicturePath: {
                type: DataTypes.TEXT
            }
        }, {sequelize, modelName: "User", tableName: "user_table"})
    }
}

module.exports = User