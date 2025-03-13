const { DataTypes} = require("sequelize");
module.exports = (Sequelize) => {
  const AssessmentResult = Sequelize.define("AssessmentResult", {
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
    assessmentId : {
        type : DataTypes.INTEGER,
        allowNull: false,
    },
    assignedTestId : {
       type: DataTypes.INTEGER,
       allowNull: false, 
    },
    score: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    date: {
      type: DataTypes.DATE,
    },
    strength : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    weakness : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    comment : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    coachId : {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    isSubmitted : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPresent : {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    }
  },{ onDelete: 'CASCADE' });

  return AssessmentResult;
};
