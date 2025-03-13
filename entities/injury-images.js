const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const InjuryImage = sequelize.define("InjuryImage", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    injuryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return InjuryImage;
};
