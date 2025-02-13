const uploadImageCloundinary = require("../utils/uploadImageCloudinary");

const uploadImageController = async (req, res) => {
  try {
    const image = req.file;
    console.log(image);
    const uploadImage = await uploadImageCloundinary(image);
    return res.status(200).json({
      message: "Image uploaded successfully",
      success: true,
      error: false,
      data: {
        url: uploadImage.url,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || e,
      error: true,
      success: false,
    });
  }
};
module.exports = { uploadImageController };
