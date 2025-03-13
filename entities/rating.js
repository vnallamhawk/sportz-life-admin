const { DataTypes} = require("sequelize");

module.exports = (Sequelize) => {
  const Rating = Sequelize.define("Rating", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, 
    },
    athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    coachId : {
       type: DataTypes.INTEGER,
       allowNull: false, 
    },
    sportId : {
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    rating:{
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 0, max: 5 }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  });

  return Rating;
};
