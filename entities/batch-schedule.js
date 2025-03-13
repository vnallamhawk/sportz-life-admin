const { DataTypes } = require("sequelize");
const { Days } = require("../utilities/enum");

module.exports = (Sequelize) => {
  const BatchSchedule = Sequelize.define(
    "BatchSchedule",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      day: {
        type: DataTypes.ENUM(Object.values(Days)),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    // {
    //   paranoid: true, // Enable paranoid behavior
    // }
  );
  return BatchSchedule;
};
