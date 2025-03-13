const { DataTypes, STRING } = require("sequelize");

module.exports = (Sequelize) => {
  const Staff = Sequelize.define("Staff", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },   
    phone: {
      type: DataTypes.STRING,
      unique: 'phone',
    },
    email: {
      type: DataTypes.STRING,
      unique: 'email',
      validate: { isEmail: true },
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },{ onDelete: "CASCADE" });

  return Staff;
};
