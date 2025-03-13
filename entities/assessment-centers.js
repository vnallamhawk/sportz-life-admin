const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssessmentCenters = sequelize.define(
    "AssessmentCenters",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      assessmentId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      centerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },{ onDelete: 'CASCADE' }
  );

  return AssessmentCenters;
};
