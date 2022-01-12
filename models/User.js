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
                type: DataTypes.TEXT
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
            },
            isGuess: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            }

        }, {sequelize, modelName: "User", tableName: "user_table"})
    }
}

module.exports = User