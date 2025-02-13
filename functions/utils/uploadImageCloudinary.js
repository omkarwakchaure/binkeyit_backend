const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
} = require("../env/environment");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET_KEY,
});
const uploadImageCloundinary = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "binkeyit" }, (error, uploadResult) => {
        return resolve(uploadResult);
      })
      .end(buffer);
  });
  return uploadImage;
};

module.exports = uploadImageCloundinary;
