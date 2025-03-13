const { DataTypes } = require("sequelize");
const { assessment } = require(".");

module.exports = (sequelize) => {
  const AssessmentAssignedAthletes = sequelize.define(
    "AssessmentAssignedAthletes",
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
      athleteId:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },{ onDelete: 'CASCADE' }
  );

  return AssessmentAssignedAthletes;
};
