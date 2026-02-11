// import sendEmail from "../config/sendEmail.js";
// import UserModel from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

// const sendEmail = require("../config/sendEmail.js");
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// const verifyEmailTemplate = require("../utils/verifyEmailTemplate.js");
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloundinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import {SECRET_KEY_REFRESH_TOKEN} from "../env/environment.js";

const registerUserController = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Pleae provide all required fields",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "Email Already Exists",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = await UserModel(payload);
    const savedUser = await newUser.save();

    // const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

    // const verifyEmail = await sendEmail({
    //   sendTo: email,
    //   subject: "Email Verification",
    //   html: verifyEmailTemplate({
    //     name,
    //     url: verifyEmailUrl,
    //   }),
    // });

    return res.json({
      message: "User Registered Successfully",
      success: true,
      error: false,
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const verifyEmailController = async function (req, res) {
  try {
    const { code } = req.body;
    console.log(code);
    const user = await UserModel.findOne({ _id: code });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid email address",
        success: false,
        error: true,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );
    return res.json({
      message: "Email Verification Successful",
      success: true,
      error: false,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const loginController = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        success: false,
        error: true,
      });
    }
    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Your account is not active.Please contact to Admin",
        success: false,
        error: true,
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Check Your Password",
        success: false,
        error: true,
      });
    }
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date().toISOString(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "Login Successful",
      success: true,
      error: false,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const logoutController = async function (req, res) {
  try {
    const userid = req.userId;
    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.clearCookie("accessToken", cookieOption);
    res.clearCookie("refreshToken", cookieOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    return res.json({
      message: "Logout Successful",
      success: true,
      error: false,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const uploadAvatar = async function (req, res) {
  try {
    const userid = req.userId;
    const image = req.file;
    const upload = await uploadImageCloundinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userid, {
      avatar: upload.url,
    });

    return res.json({
      message: "Image uploaded successfully",
      success: true,
      error: false,
      data: {
        _id: userid,
        avatar: upload.url,
      },
    });
     
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const updateUserDetails = async function (req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.json({
      message: "User details updated successfully",
      success: true,
      error: false,
      data: updatedUser,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const forgotPasswordController = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        success: false,
        error: true,
      });
    }
    const otp = generateOtp();
    const expireTime = new Date() + 60 * 60 * 1000; //1hr

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    // await sendEmail({
    //   sendEmail: email,
    //   Subject: `Forgot Password from binkeyit`,
    //   html: forgotPasswordTemplate({
    //     name: user.name,
    //     otp,
    //   }),
    // });

    return res.json({
      message: "Otp sent successfully, Please Check your email",
      data: {
        otp,
      },
      success: true,
      error: false,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const verifyForgotPasswordOtp = async function (req, res) {
  try {
    const { email } = req.body;
    const { otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!email || !otp) {
      return res.status(400).json({
        message: "Please provide required fields",
        success: false,
        error: true,
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        success: false,
        error: true,
      });
    }

    const currentTime = new Date();

    if (user.forgot_password_expiry < currentTime.toISOString()) {
      return res.status(400).json({
        message: "Otp is expired",
        success: false,
        error: true,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid Otp!",
        success: true,
        error: false,
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, {
      otp_verified: true,
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "Otp Verified Successfully",
      success: true,
      error: false,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const resetPasswordController = async function (req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide required fields",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered!",
        success: false,
        error: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match!",
        success: false,
        error: true,
      });
    }

    if (!user.otp_verified) {
      return res.status(400).json({
        message: "Please verify OTP first!",
        success: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
      otp_verified: false,
    });
    return res.json({
      message: "New password saved successfully!",
      success: true,
      error: false,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const refreshTokenController = async function (req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized Access! Invalid refresh token",
        success: false,
        error: true,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token is expired",
        success: false,
        error: true,
      });
    }
    const userId = verifyToken?.id;
    const newAccessToken = await generateAccessToken(userId);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("accessToken", newAccessToken, cookieOption);

    return res.json({
      message: "New access token generated successfully!",
      success: true,
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

const userDetails = async function (req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token"
    );
    return res.json({
      message: "User details Fetch Successfully",
      success: true,
      error: false,
      data: {
        user,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      success: false,
      error: true,
    });
  }
};

export { 
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvatar,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetPasswordController,
  refreshTokenController,
  userDetails
}
