const { DataTypes } = require("sequelize");
const { TrainingLevels, FitnessComponent } = require("../utilities/enum");

module.exports = (sequelize) => {
  const TrainingDrill= sequelize.define(
    "TrainingDrill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      objective:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      coachingPoint:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      level:{
        type: DataTypes.ENUM(Object.values(TrainingLevels)),
        allowNull: false,
      },
      fitnessComponent:{
        type: DataTypes.ENUM(Object.values(FitnessComponent)),
        allowNull: true,
        defaultValue : null
      },
      sportId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : null
      },
      coachId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    { paranoid: true }
  );
  return TrainingDrill;
};
