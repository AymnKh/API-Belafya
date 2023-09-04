const express = require("express");
const productDonationSide = require("../../controllers/product/product-donationSide");
const router = express.Router();

//productDonationSide routes
router.post("/add", productDonationSide.addProductDonationSide);
router
  .route("/all")
  .get(productDonationSide.getAllProductDonationSide)
  .delete(productDonationSide.deleteAllProductDonationSide);

router.delete("/:id", productDonationSide.deleteDonationSideById);

module.exports = router;
