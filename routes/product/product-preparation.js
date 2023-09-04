const express = require("express");
const productPreparation = require("../../controllers/product/product-preparation");
const router = express.Router();

//productPreparation routes
router.post("/add", productPreparation.addProductPreparation);
router
  .route("/all")
  .get(productPreparation.getAllProductPreparation)
  .delete(productPreparation.deleteAllProductPreparation);

router.delete("/:id", productPreparation.deletePreparationById);

module.exports = router;
