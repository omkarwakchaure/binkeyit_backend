import express from "express";
import auth from "../middleware/auth";
import {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller.js";


const { Router } = express;
const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddCategoryController);
categoryRouter.get("/get-category", getCategoryController);
categoryRouter.put("/update-category", auth, updateCategoryController);
categoryRouter.delete("/delete-category", auth, deleteCategoryController);

export default categoryRouter;
