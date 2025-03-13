const { DataTypes, STRING } = require("sequelize");
const {
  Genders,
  TrainingLevels,
  ExperienceLevels,
} = require("../utilities/enum");

module.exports = (sequelize) => {
  const Coach = sequelize.define(
    "Coach",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trainingLevel: {
        type: DataTypes.ENUM(...Object.values(TrainingLevels)),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(Genders)),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      countryCode: {
        type: STRING,
        allowNull: false,
        defaultValue: "+91",
      },
      phone: {
        type: DataTypes.STRING,
        unique: 'phone',
      },
      email: {
        type: DataTypes.STRING,
        unique: 'email',
        validate: { isEmail: true },
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      payrollId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      experienceLevel: {
        type: DataTypes.ENUM(...Object.values(ExperienceLevels)),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    { paranoid: true }
  );

  return Coach;
};
