const express = require("express");
const auth = require("../middleware/auth");

const {
  AddSubCategoryController,
  GetSubCategoryController,
  UpdateSubCategoryController,
  DeleteSubCategoryController,
} = require("../controllers/subCategory.controller");

const { Router } = express;
const subCategoryRouter = Router();

subCategoryRouter.post("/add-sub-category", auth, AddSubCategoryController);
subCategoryRouter.get("/get-sub-category", auth, GetSubCategoryController);
subCategoryRouter.put("/update-sub-category",auth,UpdateSubCategoryController)
subCategoryRouter.delete("/delete-sub-category", auth, DeleteSubCategoryController);

module.exports = subCategoryRouter;
