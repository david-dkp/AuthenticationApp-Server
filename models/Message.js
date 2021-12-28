const {Model, DataTypes} = require("sequelize")

class Message extends Model {
    static initModel(sequelize) {
        Message.init({
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                text: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: "message_table",
                modelName: "Message",
                timestamps: false
            }
        )
    }
}

module.exports = Message