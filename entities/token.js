const { DataTypes } = require("sequelize");
const { UserTypes } = require("../utilities/enum");

module.exports = (sequelize) => {
  const Token = sequelize.define(
    "Token",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      countryCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "phone",
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userType: {
        type: DataTypes.ENUM(...Object.values(UserTypes)),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return Token;
};
