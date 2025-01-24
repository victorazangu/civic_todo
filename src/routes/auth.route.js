const express = require("express");
const router = express.Router();
const { validateRequest, authenticate } = require("../middlewares");
const { authValidations } = require("../validations");
const { authController } = require("../controllers");

router.post(
  "/register",
  validateRequest(authValidations.createUserSchema),
  authController.registerUser
);

router.post(
  "/login",
  validateRequest(authValidations.loginUserSchema),
  authController.loginUser
);

router.get("/me", authenticate, authController.getMe);

module.exports = router;
