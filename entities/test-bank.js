const { DataTypes} = require("sequelize");

module.exports = (Sequelize) => {
  const TestBank = Sequelize.define("TestBank", {
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

  return TestBank;
};
