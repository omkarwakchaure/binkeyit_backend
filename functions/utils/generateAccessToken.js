const jwt = require("jsonwebtoken");
const { SECRET_KEY_ACCESS_TOKEN } = require("../env/environment");
const generateAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "5h",
  });
  return token;
};

module.exports = generateAccessToken;
