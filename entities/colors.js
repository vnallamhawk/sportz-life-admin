const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Color = sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: 'name',
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        unique: 'code',
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    // {command:gitlens.showCommitsView
    //   paranoid: true,
    // }
  );
  
  return Color;
};
