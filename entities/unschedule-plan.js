const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UnscheduledPlan = sequelize.define(
    "UnscheduledPlan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coachId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
  return UnscheduledPlan;
};
