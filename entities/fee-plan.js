const { DataTypes } = require("sequelize");
const { FeeType, LateFeeType, RecuuringType } = require("../utilities/enum");


module.exports = (sequelize) => {
  const feeplan = sequelize.define("FeePlan", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    feeType: {
      type: DataTypes.ENUM(...Object.values(FeeType)),
      allowNull: true,
    },
    recurringType: {
      type: DataTypes.ENUM(...Object.values(RecuuringType)),
      allowNull: true,
    },
    isLateFee: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lateFeeType: {
      type: DataTypes.ENUM(...Object.values(LateFeeType)),
      allowNull: true,
    },
    lateFee: {
      type: DataTypes.FLOAT, // For Amount
      allowNull: true,
    },
    isFractionalFee: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  return feeplan;
};
