const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Center = sequelize.define(
    "Center",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      academyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull:true,
      }
    },
    { paranoid: true }
  );

  return Center;
};
