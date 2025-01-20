const { User } = require("../models");

const createUser = async (body) => {
  return User.create(body);
};
