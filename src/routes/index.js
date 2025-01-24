const express = require("express");

const landingRouter = require("./home.route");
const authRouter = require("./auth.route");
const usersRouter = require("./users.route");
const todosRouter = require("./todos.route");

const router = express.Router();

const defaultRoutes = [
  { path: "/", route: landingRouter },
  { path: "/auth", route: authRouter },
  { path: "/users", route: usersRouter },
  { path: "/todos", route: todosRouter },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
