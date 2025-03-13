const { DataTypes } = require("sequelize");
const { UserTypes } = require("../utilities/enum");

module.exports = (sequelize) => {
  const Otp = sequelize.define(
    "Otp",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "+91",
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      expiryTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      verified: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      userType: {
        type: DataTypes.ENUM(...Object.values(UserTypes)),
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    // { paranoid: true }
  );

  return Otp;
};
