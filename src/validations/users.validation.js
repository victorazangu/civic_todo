const Joi = require("joi");

const getAllUsersSchema = {
  query: Joi.object({
    search: Joi.string().optional(),
    skip: Joi.number().integer().min(0).optional(),
    limit: Joi.number().integer().min(1).optional(),
  }),
};

const getUserByIdSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};

const updateUserSchema = {
  body: Joi.object({
    firstName: Joi.string().min(1).optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  }),
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};
const softDeleteUserSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};
const hardDeleteUserSchema = {
  params: Joi.object({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getAllUsersSchema,
  updateUserSchema,
  getUserByIdSchema,
  softDeleteUserSchema,
  hardDeleteUserSchema,
};
