import express from "express";
import {
  uploadAvatar,
  logoutController,
  loginController,
  registerUserController,
  verifyEmailController,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetPasswordController,
  refreshTokenController,
  userDetails,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";


const { Router } = express;
const userRouter = Router();


userRouter.post("/register", registerUserController);
userRouter.post("/verify_email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
userRouter.get("/user-details", auth, userDetails);

userRouter.get("/test", (req, res) => {
  res.json({ message: "This is a test endpoint" });
});

export default userRouter;
