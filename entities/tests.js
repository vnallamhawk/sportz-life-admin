const { DataTypes } = require("sequelize");
const {
  FitnessType,
  FitnessComponent,
  TestGoal,
  TestMeasureType,
  UnitType,
  Units,
  TrainingLevels,
  TestType,
} = require("../utilities/enum");

module.exports = (Sequelize) => {
  const Test = Sequelize.define("Test", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testBankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trainingLevel: {
      type: DataTypes.ENUM(Object.values(TrainingLevels)),
      allowNull: false,
    },
    objective: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fitnessType: {
      type: DataTypes.ENUM(Object.values(FitnessType)),
      allowNull: true,
    },
    fitnessComponent: {
      type: DataTypes.ENUM(Object.values(FitnessComponent)),
      allowNull: true,
    },
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    academyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    measureType: {
      type: DataTypes.ENUM(Object.values(TestMeasureType)),
      allowNull: false,
    },
    unitType: {
      type: DataTypes.ENUM(Object.values(UnitType)),
      allowNull: true,
    },
    units: {
      type: DataTypes.ENUM(Object.values(Units)),
      allowNull: true,
    },
    minValue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxValue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    testGoal: {
      type: DataTypes.ENUM(Object.values(TestGoal)),
      allowNull: true,
    },
    typeTest: {
      type: DataTypes.ENUM(Object.values(TestType)),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  });

  return Test;
};
