const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const sportsMaster = sequelize.define("sportsMaster", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    sportName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return sportsMaster;
};
