const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SportsColorMap = sequelize.define(
    "SportsColorMap",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      colorId: {
        type: DataTypes.INTEGER, // Corrected data type to INTEGER
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    // {
    //   paranoid: true,
    // }
  );
  
  return SportsColorMap;
};
