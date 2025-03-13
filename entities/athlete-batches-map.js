const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AthleteBatchesMap = sequelize.define(
    "AthleteBatchesMap",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      athleteId: {
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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }
    // {
    //   paranoid: true,
    // }
  );
  return AthleteBatchesMap;
};
