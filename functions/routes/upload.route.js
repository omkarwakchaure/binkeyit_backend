const express = require("express");
const { Router } = express;
const uploadRouter = Router();

const auth = require("../middleware/auth");
const {
  uploadImageController,
} = require("../controllers/uploadImage.controller");
const upload = require("../middleware/multer.js");
uploadRouter.post(
  "/upload-image",
  auth,
  upload.single("image"),
  uploadImageController
);

module.exports = uploadRouter;
