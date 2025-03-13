const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Sport = sequelize.define(
    "Sport",
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
      subTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      academyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    { paranoid: true }
  );

  return Sport;
};
