const path = require("path");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { privateKey } = require("../constants/keys");


const IsAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, privateKey, {
      issuer: config.jwt.issuer,
      algorithms: [config.jwt.algorithm],
    });
    req.user = decoded.payload;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = IsAuthenticated;
