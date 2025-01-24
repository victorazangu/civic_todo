const{ sequelize } = require("../config");
const Todo = require("./todos.model");
const User = require("./users.model");

Todo.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Todo, { foreignKey: "ownerId" });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

syncDatabase();

module.exports = {
  User,
  Todo,
};
