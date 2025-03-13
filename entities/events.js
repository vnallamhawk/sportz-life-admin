const { DataTypes } = require("sequelize");
const { EventStatus } = require("../utilities/enum");

module.exports = (sequelize) => {
  const Events = sequelize.define(
    "Events",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      eventStatus: {
        type: DataTypes.ENUM(...Object.values(EventStatus)),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ageStart: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ageEnd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registrationFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      eventFlayer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: { type: DataTypes.STRING, allowNull: false },
      city: { type: DataTypes.STRING, allowNull: false },
      venueLocation: { type: DataTypes.STRING, allowNull: false },
      paymentOptions: {
        allowNull: false,
        type: DataTypes.JSON(),
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    { onDelete: "CASCADE" }
  );

  return Events;
};
