const { User } = require("../models");

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (!users) {
      const error = new Error("Users not found");
      error.statusCode = 404;
      error.message = "Users not found";
      throw error;
    }
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.message = "User not found";
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, user) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.message = "User not found";
      throw error;
    }
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
    const updatedUser = await User.update(user, {
      where: {
        id: id,
      },
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const softDeleteUser = async (id) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.message = "User not found";
      throw error;
    }
    await User.update(
      { isDeleted: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
const hardDeleteUser = async (id) => {
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.message = "User not found";
      throw error;
    }
    await User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
};
