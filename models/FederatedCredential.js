const {Model, DataTypes} = require("sequelize")
const User = require("./User");

class FederatedCredential extends Model {
    static initModel(sequelize) {
        FederatedCredential.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: User,
                        key: "id",
                    }
                },
                provider: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                subject: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                timestamps: false,
                sequelize,
                modelName: "FederatedCredential",
                tableName: "federated_credential_table"
            }
        )
    }
}

module.exports = FederatedCredential