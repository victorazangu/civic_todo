const express = require("express");
const router = express.Router();
const { validateRequest, authenticate } = require("../middlewares");
const { todosController } = require("../controllers");
const { todosValidations } = require("../validations");

router.post(
  "/",
  authenticate,
  validateRequest(todosValidations.createTodoSchema),
  todosController.createTodo
);
router.get(
  "/",
  authenticate,
  validateRequest(todosValidations.getTodosSchema),
  todosController.getTodos
);

router.get(
  "/:id",
  authenticate,
  validateRequest(todosValidations.getTodoByIdSchema),
  todosController.getTodoById
);
router.patch(
  "/:id",
  authenticate,
  validateRequest(todosValidations.updateTodoSchema),
  todosController.updateTodo
);
router.delete("/:id", todosController.deleteTodo);

module.exports = router;
