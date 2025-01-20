const Joi = require("joi");

const createUserSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), 
});

module.exports = {
  createUserSchema,
};
