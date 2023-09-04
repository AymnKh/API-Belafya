const express = require("express");
const productHead = require("../../controllers/product/product-head");
const router = express.Router();

//productHead routes
router.post("/add", productHead.addProductHead);
router
  .route("/all")
  .get(productHead.getAllProductHeads)
  .delete(productHead.deleteAllProductHeads);

router.delete("/:id", productHead.deleteHeadById);

module.exports = router;
