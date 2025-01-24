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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
        onDelete: "CASCADE",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Todo;
