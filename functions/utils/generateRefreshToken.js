const { SECRET_KEY_ACCESS_TOKEN, SECRET_KEY_REFRESH_TOKEN } = require("../env/environment");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const generateRefreshToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "7d",
  });
  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );
  return token;
};
module.exports = generateRefreshToken;
