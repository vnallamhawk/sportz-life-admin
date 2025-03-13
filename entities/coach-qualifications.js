const { DataTypes } = require("sequelize");
const { Qualification, FileType } = require("../utilities/enum");

module.exports = (sequelize) => {
  const CoachQualifications = sequelize.define(
    "CoachQualifications",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      certificateType: {
        type: DataTypes.ENUM(...Object.values(Qualification)),
        allowNull: false,
      },
      instituteName: { type: DataTypes.STRING, allowNull: false },
      fileUrl:{
        type:DataTypes.STRING,
        allowNull:false
      },
      fileName:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue : null
      },
      fileType : {
        type: DataTypes.ENUM(...Object.values(FileType)),
        allowNull : false
      },
      startDate: { type: DataTypes.DATEONLY, allowNull: false },
      endDate: { type: DataTypes.DATEONLY, allowNull: false },
      coachId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );

  return CoachQualifications;
};
