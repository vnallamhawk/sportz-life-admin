const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  const Academy = Sequelize.define(
    "Academy",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'code',
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      paranoid: true, // Enable paranoid behavior
    }
  );

  return Academy;
};
