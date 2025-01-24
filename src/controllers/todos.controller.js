const { query } = require("express");
const { todosService } = require("../services");

const createTodo = async (req, res) => {
  try {
    const todo = req.body;
    todo.ownerId = req.user.id;
    const newTodo = await todosService.createTodo(todo);
    return res.status(201).json({ data: newTodo, success: true });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const query = req.query;
    const userId = req.user.id;
    const todos = await todosService.getTodos(query, userId);
    return res.status(200).json({ data: todos, success: true });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todosService.getTodoById(id);
    return res.status(200).json({ data: todo, success: true });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = req.body;
    const updatedTodo = await todosService.updateTodo(id, todo);
    return res.status(200).json({ data: updatedTodo, success: true });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await todosService.deleteTodo(id);
    return res.status(204).json({ success: true, data: result });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
