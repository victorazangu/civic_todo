const path = require("path");
const fs = require("fs");

const folderPath = path.resolve(__dirname, "../keys");
const privateKey = fs.readFileSync(`${folderPath}/private.pem`, "utf8");
const publicKey = fs.readFileSync(`${folderPath}/public.pem`, "utf8");

module.exports = {
  privateKey,
  publicKey,
};
