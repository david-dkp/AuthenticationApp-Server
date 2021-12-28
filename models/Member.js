const {Model, DataTypes} = require("sequelize")
const User = require("./User");
const Room = require("./Room");

class Member extends Model {
    static initModel(sequelize) {
        Member.init({
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: User,
                    key: "id"
                }
            },
            roomId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: Room,
                    key: "id"
                }
            },
            joinedAt: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            tableName: "member_table",
            modelName: "Member",
            timestamps: false,
        })
    }
}

module.exports = Member