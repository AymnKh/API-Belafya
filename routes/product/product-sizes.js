const express = require("express");
const productSizes = require("../../controllers/product/product-sizes");
const router = express.Router();

//productSizes routes
router.post("/add", productSizes.addProductSize);
router
  .route("/all")
  .get(productSizes.getAllProductSizes)
  .delete(productSizes.deleteAllProductSizes);
router.delete("/:id", productSizes.deleteSizeById);

module.exports = router;
