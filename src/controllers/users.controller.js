const { usersService } = require("../services");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    return res.status(200).json({ data: users, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({ data: error.message || "Internal Server Error", success: false });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    return res.status(200).json({ data: user, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({ data: error.message || "Internal Server Error", success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await usersService.updateUser(id, user);
    return res.status(200).json({ data: updatedUser, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({ data: error.message || "Internal Server Error", success: false });
  }
};

const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.softDeleteUser(id);
    return res.status(200).json({ data: user, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({ data: error.message || "Internal Server Error", success: false });
  }
};
const hardDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.hardDeleteUser(id);
    return res.status(200).json({ data: user, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({ data: error.message || "Internal Server Error", success: false });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
};
