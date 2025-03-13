const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UnscheduledCenterBatch = sequelize.define(
    "UnscheduledCenterBatch",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      unSchedulePlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      allCenters: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      allBatches: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { paranoid: true }
  );
  return UnscheduledCenterBatch;
};
