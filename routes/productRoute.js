const express = require("express");
const router = express.Router();
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productService");
// const authService = require('../services/authService');

router.route("/").get(getProducts).post(
  // uploadProductImages,
  // resizeProductImages,
  createProductValidator,
  createProduct
);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    // uploadProductImages,
    // resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    // authService.protect,

    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
