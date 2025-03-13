const { DataTypes } = require("sequelize");
const {
  AssessmentMode,
  AssessmentInterval,
  AssessmentStatus,
  TrainingLevels,
} = require("../utilities/enum");

module.exports = (sequelize) => {
  const Assessment = sequelize.define(
    "Assessment",
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      academyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM(Object.values(TrainingLevels)),
        allowNull: false,
      },
      mode: {
        type: DataTypes.ENUM(Object.values(AssessmentMode)),
        allowNull: false,
      },
      interval: {
        type: DataTypes.ENUM(Object.values(AssessmentInterval)),
        allowNull: false,
      },
      isAthleteAssess: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      isCoachAssess: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      isStrengthAdded: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      isWeaknessAdded: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      isCommentsAdded: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      assessmentTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      assessmentStatus: {
        type: DataTypes.ENUM(Object.values(AssessmentStatus)),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValues: true,
      },
    },
    { onDelete: "CASCADE" }
  );

  return Assessment;
};
