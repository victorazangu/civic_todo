const Joi = require("joi");

const createTodoSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().optional(),
    completed: Joi.boolean().default(false),
  }),
};
const getTodosSchema = {
  query: Joi.object({
    search: Joi.string().optional(),
    skip: Joi.number().integer().min(0).optional(),
    limit: Joi.number().integer().min(1).optional(),
  }),
};

const getTodoByIdSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};

const updateTodoSchema = {
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    completed: Joi.boolean().optional(),
  }),
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  createTodoSchema,
  getTodosSchema,
  getTodoByIdSchema,
  updateTodoSchema,
};
