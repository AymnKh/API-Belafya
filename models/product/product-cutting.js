const mongoose = require("mongoose");

const productCuttingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Cutting", productCuttingSchema);
