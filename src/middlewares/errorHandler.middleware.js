const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Bad JSON format" });
  }
  next(err);
};

module.exports = errorHandler;
