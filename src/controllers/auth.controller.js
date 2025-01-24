const { authService } = require("../services");

const registerUser = async (req, res) => {
  try {
    const token = await authService.registeerUser(req.body);
    return res.status(201).json({ token, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).send({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    return res.status(200).json({ token, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .send({ message: error.message || "Internal server error" });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await authService.getMe(token);
    return res.status(200).json({ user, success: true });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .send({ message: error.message || "Internal server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
