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

const getProductController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.body;

    const query = search ? { $text: { $search: search } } : {};

    console.log(query);
    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("sub_category"),
      ProductModel.countDocuments(query),
    ]);
    console.log(data);
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      error: false,
      data,
      totalCount,
      totalNoPages: Math.ceil(totalCount / limit),
      currentPage: page,
      noOfRows: data?.length || 0,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error" || e,
      error: true,
      success: false,
    });
  }
};

module.exports = { createProductController, getProductController };
