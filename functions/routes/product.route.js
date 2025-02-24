const express = require("express");
const auth = require("../middleware/auth");
const {
  createProductController,
  getProductController,
} = require("../controllers/product.controller");

const { Router } = express;
const productRouter = Router();

productRouter.post("/add-product", auth, createProductController);
productRouter.post("/get-all-product", auth, getProductController);
module.exports = productRouter;
