const { DataTypes, STRING } = require("sequelize");
const {
  Genders,
  BloodGroups,
  HeightUnits,
  WeightUnits,
} = require("../utilities/enum");

module.exports = (Sequelize) => {
  const Athlete = Sequelize.define("Athlete", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM(Object.values(Genders)),
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.ENUM(Object.values(BloodGroups)),
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    heightUnit: {
      type: DataTypes.ENUM(Object.values(HeightUnits)),
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weightUnit: {
      type: DataTypes.ENUM(Object.values(WeightUnits)),
      allowNull: false,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: STRING,
      allowNull: true,
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    academyCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    joiningDate:{
      type: DataTypes.DATEONLY, 
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },{ onDelete: "CASCADE" });

  return Athlete;
};
