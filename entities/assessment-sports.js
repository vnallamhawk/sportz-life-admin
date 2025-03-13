const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssessmentSports = sequelize.define(
    "AssessmentSports",
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
      sportId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },{ onDelete: 'CASCADE' }
  );

  return AssessmentSports;
};
