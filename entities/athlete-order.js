const { DataTypes } = require("sequelize");
const { PaymentStatus } = require("../utilities/enum");

module.exports = (sequelize) => {
  const AthleteOrder = sequelize.define(
    "Athlete Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feePlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      updateDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        allowNull: false,
      },
      baseFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lateFee: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  return AthleteOrder;
};
