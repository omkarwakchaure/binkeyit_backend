const CategoryModel = require("../models/category.model.js");
const SubCategoryModel = require("../models/subCategory.model.js");
const ProductModel = require("../models/product.model.js");
const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.json({
        message: "Please provide all the required fields",
        error: true,
        success: false,
      });
    }
    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(400).json({
        message: "Category not saved",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Category added successfully",
      success: true,
      error: false,
      data: saveCategory,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: e.message || e, error: true, success: false });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ name: 1 });
    return res.json({
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { categoryId, name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
        error: true,
      });
    }

    const updateCategory = await CategoryModel.updateOne(
      {
        _id: categoryId,
      },
      {
        name,
        image,
      }
    );
    
    const updatedCategory = await CategoryModel.findOne({ _id: categoryId });

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();
    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkProduct > 0 || checkSubCategory > 0) {
      return res.status(400).json({
        message: "Category cannot be deleted",
        success: false,
        error: true,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({
      _id,
    });

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};
module.exports = {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
