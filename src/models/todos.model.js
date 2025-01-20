const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Todo = sequelize.define(
  "Todo",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', 
        key: 'id', 
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Todo;
