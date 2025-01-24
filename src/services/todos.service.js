const { Todo } = require("../models");
const { Op } = require("sequelize");

const createTodo = async (todo) => {
  try {
    const newTodo = await Todo.create(todo);
    return newTodo;
  } catch (err) {
    throw err;
  }
};

const getTodos = async (query, userId) => {
  try {
    const { search, skip, limit } = query || {};
    const whereClause = search ? { title: { [Op.like]: `%${search}%` } } : {};
    const queryOptions = {
      where: {
        ...whereClause,
        ownerId: userId,
      },
    };
    if (Object.keys(whereClause).length > 0) {
      queryOptions.where = whereClause;
    }
    if (skip !== undefined && Number.isInteger(Number(skip))) {
      queryOptions.offset = Number(skip);
    }
    if (limit !== undefined && Number.isInteger(Number(limit))) {
      queryOptions.limit = Number(limit);
    }
    const todos = await Todo.findAll(queryOptions);
    if (!todos || todos.length === 0) {
      const error = new Error("No todos found");
      error.statusCode = 404;
      error.message = "No todos found";
      throw error;
    }
    return todos;
  } catch (err) {
    throw err;
  }
};

const getTodoById = async (id) => {
  try {
    const existingTodo = await Todo.findByPk(id);
    if (!existingTodo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      error.message = "Todo not found";
      throw error;
    }
    return existingTodo;
  } catch (err) {
    throw err;
  }
};

const updateTodo = async (id, todo) => {
  try {
    const existingTodo = await getTodoById(id);
    if (!existingTodo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      error.message = "Todo not found";
      throw error;
    }
    const updatedTodo = await Todo.update(todo, {
      where: {
        id: id,
      },
    });
    return updatedTodo;
  } catch (err) {
    throw err;
  }
};

const deleteTodo = async (id) => {
  try {
    const existingTodo = await getTodoById(id);
    if (!existingTodo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      error.message = "Todo not found";
      throw error;
    }
    await Todo.destroy({
      where: {
        id: id,
      },
    });
    return "Todo deleted successfully";
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
