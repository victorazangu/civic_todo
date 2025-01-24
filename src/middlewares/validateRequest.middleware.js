const validateRequest = (schemas) => {
  return (req, res, next) => {
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }

    if (schemas.query) {
      const { error } = schemas.query.validate(req.query);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }

    if (schemas.params) {
      const { error } = schemas.params.validate(req.params);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    }

    next();
  };
};

module.exports = validateRequest;