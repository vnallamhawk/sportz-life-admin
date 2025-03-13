const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
  const CoachSportsMap = Sequelize.define(
    "CoachSportsMap",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      coachId: { type: DataTypes.INTEGER, allowNull: false },
      sportId: { type: DataTypes.INTEGER, allowNull: false },
      status: { type: DataTypes.TINYINT, defaultValue: 1 },
    },
    { paranoid: true }
  );

  return CoachSportsMap;
};
