const { DataTypes } = require("sequelize");
const { OneSignalIdetifier } = require("../utilities/enum");

module.exports = (sequelize) => {
    const GetOneSignal = sequelize.define("GetOneSignal", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(OneSignalIdetifier)),
            allowNull:false,
        },
        uniqueIdentifier: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        msg: {
            type : DataTypes.TEXT,
        }
    });
    return GetOneSignal;
}