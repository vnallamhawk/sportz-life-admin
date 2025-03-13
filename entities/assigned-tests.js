const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AssignedTest = sequelize.define("AssignedTest", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    assignedTestBankId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return AssignedTest;
};
