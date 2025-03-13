const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ScheduledPlan = sequelize.define(
    "ScheduledPlan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      planId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      fromDate:{
        type:DataTypes.DATEONLY,
        allowNull:false,
      },
      toDate:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      coachId: {
        type:DataTypes.INTEGER,
        allowNull:false,
      }
    },
    { paranoid: true }
  );
  return ScheduledPlan;
};
