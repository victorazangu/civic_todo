const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../data/database.sqlite",
  logging: console.log,
  //   logging: (...msg) => console.log(msg),
});

module.exports = sequelize;
