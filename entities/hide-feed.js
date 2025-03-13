const { DataTypes } = require("sequelize");
const { UserTypes } = require("../utilities/enum");

module.exports = (Sequelize) => {
  const HideFeed = Sequelize.define("HideFeed", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    feedId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM(Object.values(UserTypes)),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    }
  }, { onDelete: 'CASCADE' });

  return HideFeed;
};
