const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssessmentBatches = sequelize.define(
    "AssessmentBatches",
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
      batchId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },{ onDelete: 'CASCADE' }
  );

  return AssessmentBatches;
};
