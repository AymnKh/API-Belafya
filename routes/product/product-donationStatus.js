const express = require("express");
const productDonationStatus = require("../../controllers/product/product-donationStatus");
const router = express.Router();

//productDonationStatus routes
router.post("/add", productDonationStatus.addProductDonationStatus);
router
  .route("/all")
  .get(productDonationStatus.getAllProductDonationStatus)
  .delete(productDonationStatus.deleteAllProductDonationStatus);

router.delete("/:id", productDonationStatus.deleteDonationStatusById);

module.exports = router;
