const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const EventSports = sequelize.define(
    "EventSports",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  );
  return EventSports;
};
