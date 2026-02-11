import express from "express";
import auth from "../middleware/auth";
import {
  createProductController,
  getProductController,
} from "../controllers/product.controller.js";


const { Router } = express;
const productRouter = Router();

productRouter.post("/add-product", auth, createProductController);
productRouter.post("/get-all-product", auth, getProductController);

export default productRouter;
