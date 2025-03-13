const { DataTypes } = require("sequelize");
const { FitnessComponent } = require("../utilities/enum");

module.exports = (sequelize) => {
  const AssignedDrillFitnessComponent = sequelize.define(
    "AssignedDrillFitnessComponent",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fitnessComponent:{
        type: DataTypes.ENUM(Object.values(FitnessComponent)),
        allowNull: true, 
      },
      planId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
    },
    { paranoid: true },
  );
  return AssignedDrillFitnessComponent;
};
