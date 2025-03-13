const { DataTypes } = require("sequelize");
const {
  TrainingLevels,
  FitnessComponent,
  PlanDuration,
  TrainingPlanStatus,
  TrainingScheduleStatus,
} = require("../utilities/enum");
module.exports = (sequelize) => {
  const TrainingPlans = sequelize.define(
    "TrainingPlans",
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
      objective: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coachingPoint: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duration: {
        type: DataTypes.ENUM(Object.values(PlanDuration)),
        allowNull: false,
      },
      level: {
        type: DataTypes.ENUM(Object.values(TrainingLevels)),
        allowNull: false,
      },
      fitnessComponent: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : null,
      },
      coachId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isScheduled: {
        type: DataTypes.BOOLEAN,
        defaultValues: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValues: true,
      },
      // traningPlanStatus: {
      //   type: DataTypes.ENUM(Object.values(TrainingPlanStatus)),
      //   allowNull: true,
      //   defaultValue : null,
      // },
      // startDate: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },
      // endDate: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
        defaultValue : null,
      },
    },
    { paranoid: true }
  );
  return TrainingPlans;
};
