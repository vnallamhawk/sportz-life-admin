const { DataTypes } = require("sequelize");
const { PlanTypes, PaymentTypes, PaymentStatus } = require("../utilities/enum");
module.exports = (sequelize) => {
  const Payment = sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountToBePaid: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paidAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      planType: {
        type: DataTypes.ENUM(...Object.values(PlanTypes)),
        allowNull: false,
      },
      paymentType: {
        type: DataTypes.ENUM(...Object.values(PaymentTypes)),
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM(...Object.values(PaymentStatus)),
        defaultValue: PaymentStatus.PENDING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      razorpayOrderId: { type: DataTypes.STRING, allowNull: false },
      razorpayPaymentId: { type: DataTypes.STRING, allowNull: true },
      razorpaySignature: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: true,
    }

    // {
    //   paranoid: true,
    // }
  );
  return Payment;
};
