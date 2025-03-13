const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const AssignedTestBanks = sequelize.define(
    "AssignedTestBanks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      assessmentId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      testBankId: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
    },
  );

  return AssignedTestBanks;
};
