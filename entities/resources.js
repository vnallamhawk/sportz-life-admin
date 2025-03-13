const { DataTypes } = require("sequelize");
const { FileType } = require("../utilities/enum");


module.exports = (sequelize) => {
  const Resources = sequelize.define(
    "Resources",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      drillId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null
      },
      planId:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue: null
      },
      url:{
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM(Object.values(FileType)),
        allowNull:false
      },
    },
    { paranoid: true }
  );
  return Resources;
};
