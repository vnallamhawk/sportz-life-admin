const { DataTypes } = require("sequelize");
const { FitnessComponent } = require("../utilities/enum");

module.exports = (sequelize) => {
  const AssignedDrill = sequelize.define(
    "AssignedDrill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      drillFitnessComponentId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      drillId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
    },
    { paranoid: true }
  );
  return AssignedDrill;
};
