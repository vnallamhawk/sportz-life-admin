const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssessmentAssignedCoaches = sequelize.define(
    "AssessmentAssignedCoaches",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      assessmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      coachId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { onDelete: "CASCADE" }
  );

  return AssessmentAssignedCoaches;
};
