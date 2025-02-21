const express = require("express");
const auth = require("../middleware/auth");
const {
  createProductController,
} = require("../controllers/product.controller");

const { Router } = express;
const productRouter = Router();

productRouter.post("/add-product", auth, createProductController);

module.exports = productRouter;