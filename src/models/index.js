import User from "./users.model";
import Todo from "./todos.model";

Todo.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Todo, { foreignKey: 'ownerId' });

export default {
  User,
  Todo,
};
