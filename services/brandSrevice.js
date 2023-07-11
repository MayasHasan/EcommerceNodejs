const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");
const Brand = require("../models/brandModel");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

module.exports.uploadBrandImage = uploadSingleImage("image");

module.exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);
  // Save image into our db
  req.body.image = filename;
  next();
});
module.exports.getBrands = getAll(Brand);
module.exports.createBrand = createOne(Brand);

module.exports.getBrand = getOne(Brand);

module.exports.updateBrand = updateOne(Brand);
module.exports.deleteBrand = deleteOne(Brand);
