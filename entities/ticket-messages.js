const { DataTypes} = require("sequelize");
const { UserTypes } = require("../utilities/enum");
module.exports = (Sequelize) => {
  const TicketMessages = Sequelize.define("TicketMessages", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    ticketId : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
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
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },{ onDelete: 'CASCADE' });

  return TicketMessages;
};
