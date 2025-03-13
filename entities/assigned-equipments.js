const { DataTypes } = require("sequelize");
const {Equipment } = require("../utilities/enum");

module.exports = (sequelize) => {
  const AssignedEquipment = sequelize.define(
    "AssignedEquipment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      drillId:{
        type:DataTypes.INTEGER,
        allowNull:false,
      },
      equipment: {
        type: DataTypes.ENUM(Object.values(Equipment)),
        allowNull:false
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { paranoid: true }
  );
  return AssignedEquipment;
};
