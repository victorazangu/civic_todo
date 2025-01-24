const jwt = require("jsonwebtoken");
const { privateKey } = require("../constants/keys");
const { config } = require("../config");
const usersService = require("./users.service");

const generateToken = (user) => {
  const data = {
    id: user?.id,
    email: user?.email,
    first_name: user?.firstName,
    last_name: user?.lastName,
  };
  const token = jwt.sign(
    { payload: data },
    {
      key: privateKey.replace(/\\n/gm, "\n"),
      passphrase: config.jwt.secret,
    },
    {
      issuer: config.jwt.issuer,
      algorithm: config.jwt.algorithm,
      expiresIn: config.jwt.expiresIn,
    }
  );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, privateKey, {
      issuer: config.jwt.issuer,
      algorithms: [config.jwt.algorithm],
    });
    if (!decoded) {
      return null;
    }
    if (decoded.exp < Date.now().valueOf() / 1000) {
      return null;
    }
    if (!decoded.payload) {
      return null;
    }
    const user = usersService.getUserById(decoded.payload.id);
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
