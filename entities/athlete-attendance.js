const { DataTypes } = require("sequelize");
const { AttendanceStatus } = require("../utilities/enum");
module.exports = (sequelize) => {
  const AthleteAttendance = sequelize.define(
    "AthleteAttendance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      
      },
      attendance: {
        type: DataTypes.ENUM(...Object.values(AttendanceStatus)),
        defaultValue: AttendanceStatus.PRESENT,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      paranoid: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  );
  return AthleteAttendance;
};
