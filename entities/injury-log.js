const { DataTypes } = require("sequelize");
const {
  InjuryActivityType,
  InjuryType,
  RecoveryTime,
  BodyParts,
  UpperBodyParts,
  LowerBodyParts,
  MiddleBodyParts,
  InjuryStatus,
} = require("../utilities/enum");

module.exports = (sequelize) => {
  const InjuryLog = sequelize.define("InjuryLog", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    athleteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bodyPart: {
      type: DataTypes.ENUM(Object.values(BodyParts)),
      allowNull: false,
    },
    bodyPartName: {
      type: DataTypes.ENUM([
        ...Object.values(UpperBodyParts),
        ...Object.values(LowerBodyParts),
        ...Object.values(MiddleBodyParts),
      ]),
      allowNull: false,
    },
    injuryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    injuryTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.ENUM(Object.values(InjuryActivityType)),
      allowNull: false,
    },
    injuryStatus: {
      type: DataTypes.ENUM(Object.values(InjuryStatus)),
      allowNull: false,
      defaultValue: InjuryStatus.ACTIVE,
    },
    injuryType: {
      type: DataTypes.ENUM(Object.values(InjuryType)),
      allowNull: false,
    },
    recoveryTime: {
      type: DataTypes.ENUM(Object.values(RecoveryTime)),
      allowNull: false,
    },
    isAidDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    medicalReport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return InjuryLog;
};
