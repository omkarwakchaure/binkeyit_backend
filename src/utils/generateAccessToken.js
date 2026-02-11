import jwt from "jsonwebtoken";
import  {SECRET_KEY_ACCESS_TOKEN}  from "../env/environment.js";

const generateAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "5h",
  });
  return token;
};

export default generateAccessToken
