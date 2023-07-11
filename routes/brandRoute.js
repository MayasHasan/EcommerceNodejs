const express = require("express");
const router = express.Router();
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

// const authService = require("../services/authService");

const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandSrevice");

router
  .route("/")
  .get(getBrands)
  .post(uploadBrandImage, resizeImage, createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

module.exports = router;

// const authService = require('../services/authService');

// const {
//   getBrands,
//   getBrand,
//   createBrand,
//   updateBrand,
//   deleteBrand,
//   uploadBrandImage,
//   resizeImage,
// } = require('../services/brandService');

// const router = express.Router();

// router
//   .route('/')
//   .get(getBrands)
//   .post(
//     authService.protect,
//     authService.allowedTo('admin', 'manager'),
//     uploadBrandImage,
//     resizeImage,
//     createBrandValidator,
//     createBrand
//   );
// router
//   .route('/:id')
//   .get(getBrandValidator, getBrand)
//   .put(
//     authService.protect,
//     authService.allowedTo('admin', 'manager'),
//     uploadBrandImage,
//     resizeImage,
//     updateBrandValidator,
//     updateBrand
//   )
//   .delete(
//     authService.protect,
//     authService.allowedTo('admin'),
//     deleteBrandValidator,
//     deleteBrand
//   );

// module.exports = router;
