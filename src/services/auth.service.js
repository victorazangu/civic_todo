const { User } = require("../models");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");

const hashPassword = async (password) => {
  const saltRounds = bcrypt.genSaltSync(10);
  return await bcrypt.hashSync(password, saltRounds);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const registeerUser = async (body) => {
  try {
    const user = await User.findOne({ where: { email: body.email } });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      error.message = "User already exists";
      throw error;
    }

    body.password = await hashPassword(body.password);
    const createdUser = await User.create(body);
    const token = tokenService.generateToken(createdUser);
    return token;
  } catch (err) {
    throw err;
  }
};

const loginUser = async (body) => {
  try {
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.message = "User not found";
      throw error;
    }
    const isValidPassword = await comparePassword(body.password, user.password);
    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      error.message = "Invalid password";
      throw error;
    }
    return tokenService.generateToken(user);
  } catch (err) {
    throw err;
  }
};

const getMe = async (authHeader) => {
  try {
    const [bearer, token] = authHeader.split(" ");
    return tokenService.verifyToken(token);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  registeerUser,
  loginUser,
  comparePassword,
  hashPassword,
  getMe,
};
