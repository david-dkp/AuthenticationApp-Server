const {Model, DataTypes} = require("sequelize")

class Room extends Model {
    static initModel(sequelize) {
        Room.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT
            }
        }, {
            sequelize,
            tableName: "room_table",
            modelName: "Room",
            timestamps: false
        })
    }
}

module.exports = Room