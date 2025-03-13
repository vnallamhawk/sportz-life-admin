const { DataTypes } = require("sequelize");
module.exports = (Sequelize) => {
  // const CoachOnCenters = Sequelize.define(
  //   "CoachCenters",
  //   {
  //     id: {
  //       type: DataTypes.INTEGER,
  //       autoIncrement: true,
  //       primaryKey: true,
  //       allowNull: false,
  //       unique: true,
  //     },
  //     centerId: { type: DataTypes.INTEGER, allowNull: false },
  //     coachId: { type: DataTypes.INTEGER, allowNull: false },
  //     status: { type: DataTypes.TINYINT, defaultValue: 1 },
  //   },
  //   { paranoid: true }
  // );

  // return CoachOnCenters;
  const CoachCentersBatches = Sequelize.define(
    "CoachCentersBatches",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      batchId: { type: DataTypes.INTEGER, allowNull: false },
      centerId: { type: DataTypes.INTEGER, allowNull: false },
      coachId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["centerId", "coachId"], // Explicitly defining the unique constraint
        },
      ],
      paranoid: true,
    }
  );
  return CoachCentersBatches;  
};
