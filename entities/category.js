const { DataTypes} = require("sequelize");

module.exports = (Sequelize) => {
  const Category = Sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  });

  return Category;
};
