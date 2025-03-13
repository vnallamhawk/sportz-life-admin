const { DataTypes } = require("sequelize");
module.exports = (Sequelize) => {
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
      batchId: { type: DataTypes.INTEGER, allowNull: false , unique: false,},
      centerId: { type: DataTypes.INTEGER, allowNull: false , unique: false,},
      coachId: { type: DataTypes.INTEGER, allowNull: false, unique: false, },
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    { paranoid: true }
  );

  return CoachCentersBatches;
};
