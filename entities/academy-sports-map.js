const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const AcademySportsMap = sequelize.define(
    "AcademySportsMap",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      academyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    // // { paranoid: true }
  );

  return AcademySportsMap;
};
