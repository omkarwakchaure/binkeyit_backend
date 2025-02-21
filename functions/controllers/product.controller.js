const ProductModel = require("../models/product.model");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      description,
      sub_category,
      unit,
      stock,
      price,
      discount,
      more_details,
    } = req.body;

    if (
      !name ||
      !image ||
      !category ||
      !description ||
      !sub_category ||
      !unit ||
      !stock ||
      !price ||
      !discount ||
      !more_details
    ) {
      return res.status(400).json({
        message: "Please provide all the required fields",
        error: true,
        success: false,
      });
    }

    const addProduct = new ProductModel({
      name,
      image,
      category,
      description,
      sub_category,
      unit,
      stock,
      price,
      discount,
      more_details,
    });

    const saveProduct = await addProduct.save();

    return res.status(200).json({
      message: "Product added successfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = { createProductController };
