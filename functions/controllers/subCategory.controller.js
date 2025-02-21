const SubCategoryModel = require("../models/subCategory.model.js");
const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "Please provide all the required fields",
        error: true,
        success: false,
      });
    }

    const addSubCategory = new SubCategoryModel({
      name,
      image,
      category,
    });

    const save = await addSubCategory.save();
    const savedSubCategory = await save.populate("category");
    return res.status(200).json({
      message: "SubCategory added successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: e.message || e, error: true, success: false });
  }
};

const GetSubCategoryController = async (req, res) => {
  try {
    const data = await SubCategoryModel.find({})
      .sort({ name: 1 })
      .populate("category");
    return res.status(200).json({
      error: false,
      success: true,
      data: data,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: e.message || e, error: true, success: false });
  }
};

const UpdateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });
    return res.status(200).json({
      message: "SubCategory updated successfully",
      error: false,
      success: true,
      data: {
        _id,
        name,
        image,
        category,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const DeleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);
    
    return res.status(200).json({
      message: "SubCategory deleted successfully",
      error: false,
      success: true,
      data: deleteSubCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  AddSubCategoryController,
  GetSubCategoryController,
  UpdateSubCategoryController,
  DeleteSubCategoryController,
};
