const { DataTypes } = require("sequelize");
const { TrainingLevels } = require("../utilities/enum");

module.exports = (Sequelize) => {
  const AthleteSportsMap = Sequelize.define(
    "AthleteSportsMap",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sportsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trainingLevel: {
        type: DataTypes.ENUM(...Object.values(TrainingLevels)),
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      batchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    // // { paranoid: true }
  );

  return AthleteSportsMap;
};
