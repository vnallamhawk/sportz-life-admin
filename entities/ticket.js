const { DataTypes } = require("sequelize");
const { TicketStatus, UserTypes } = require("../utilities/enum");

module.exports = (Sequelize) => {
  const Ticket = Sequelize.define("Ticket", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM(Object.values(UserTypes)),
      allowNull: false,
    },
    ticketStatus: {
      type: DataTypes.ENUM(Object.values(TicketStatus)),
      defaultValue: TicketStatus.OPEN,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    }
  }, { onDelete: 'CASCADE' });

  return Ticket;
};
