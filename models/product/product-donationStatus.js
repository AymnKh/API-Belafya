const mongoose = require("mongoose");

const productDonationStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DonationStatus", productDonationStatusSchema);
