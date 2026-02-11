import express from "express";
import auth from "../middleware/auth";
import { uploadImageController } from "../controllers/upload.controller.js";
import upload from "../middleware/multer";

const { Router } = express;
const uploadRouter = Router();

 
uploadRouter.post(
  "/upload-image",
  auth,
  upload.single("image"),
  uploadImageController
);

export default uploadRouter;
