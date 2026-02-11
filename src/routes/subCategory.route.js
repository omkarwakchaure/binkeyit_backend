import express from "express";
import auth from "../middleware/auth";

import {
  AddSubCategoryController,
  GetSubCategoryController,
  UpdateSubCategoryController,
  DeleteSubCategoryController,
} from "../controllers/subCategory.controller.js";



const { Router } = express;
const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category", auth, AddSubCategoryController);
subCategoryRouter.get("/get-sub-category", auth, GetSubCategoryController);
subCategoryRouter.put("/update-sub-category",auth,UpdateSubCategoryController)
subCategoryRouter.delete("/delete-sub-category", auth, DeleteSubCategoryController);

export default subCategoryRouter;