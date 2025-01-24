const express = require("express");
const { errorHandler } = require("./middlewares");
const app = express();
const router = require("./routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.use(errorHandler);

module.exports = app;
