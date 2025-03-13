const { DataTypes } = require("sequelize");
const { TrainingLevels } = require("../utilities/enum");

module.exports = (sequelize) => {
  const Batch = sequelize.define(
    "Batch",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      capacity: { type: DataTypes.INTEGER, allowNull: false },
      remainingSeat: { type: DataTypes.INTEGER, allowNull: false },
      occupiedSeat: { type: DataTypes.INTEGER, allowNull: false },
      feePlanId: { type: DataTypes.INTEGER, allowNull: false },
      // price: { type: DataTypes.INTEGER, allowNull: false },
      trainingLevel: {
        type: DataTypes.ENUM(...Object.values(TrainingLevels)),
        allowNull: false,
      },
      academyId: { type: DataTypes.INTEGER, allowNull: false },
      centerId: { type: DataTypes.INTEGER, allowNull: false },
      sportId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    { timestamps: true }
  );

  return Batch;
};
