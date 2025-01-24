const express = require("express");
const router = express.Router();
const { validateRequest, authenticate } = require("../middlewares");
const { usersValidations } = require("../validations");
const { usersController } = require("../controllers");

router.get(
  "/",
  authenticate,
  validateRequest(usersValidations.getAllUsersSchema),
  usersController.getAllUsers
);

router.get(
  "/:id",
  authenticate,
  validateRequest(usersValidations.getUserByIdSchema),
  usersController.getUserById
);

router.patch(
  "/:id",
  authenticate,
  validateRequest(usersValidations.updateUserSchema),
  usersController.updateUser
);

router.delete(
  "/:id",
  authenticate,
  validateRequest(usersValidations.softDeleteUserSchema),
  usersController.softDeleteUser
);

router.delete(
  "/:id/hard-delete",
  authenticate,
  validateRequest(usersValidations.hardDeleteUserSchema),
  usersController.hardDeleteUser
);

module.exports = router;
