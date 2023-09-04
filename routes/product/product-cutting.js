const express = require("express");
const productCutting = require("../../controllers/product/product-cutting");
const router = express.Router();

//productCutting routes
router.post("/add", productCutting.addProductCutting);
router
  .route("/all")
  .get(productCutting.getAllProductCutting)
  .delete(productCutting.deleteAllProductCutting);

router.delete("/:id", productCutting.deleteCuttingById);

module.exports = router;
