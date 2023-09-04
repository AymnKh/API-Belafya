const mongoose = require("mongoose");

const productDonationSideSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DonationSide", productDonationSideSchema);
