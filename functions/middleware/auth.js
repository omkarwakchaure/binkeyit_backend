const jwt = require("jsonwebtoken");
const { SECRET_KEY_ACCESS_TOKEN } = require("../env/environment");
const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]; //["Bearer","token"]

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
      });
    }
    const decode = await jwt.verify(token, SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized access token",
        success: false,
        error: true,
      });
    }
    req.userId = decode.id;

    // console.log(decode);
    // console.log("token", token);
    next();
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

module.exports = auth;
