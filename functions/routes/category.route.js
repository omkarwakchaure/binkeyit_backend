const express = require("express");
const auth = require("../middleware/auth");
const {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category.controller");
const { Router } = express;
const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddCategoryController);
categoryRouter.get("/get-category", getCategoryController);
categoryRouter.put("/update-category", auth, updateCategoryController);
categoryRouter.delete("/delete-category", auth, deleteCategoryController);

module.exports = categoryRouter;
