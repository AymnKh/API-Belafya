const mongoose = require("mongoose");

const productPreparationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Preparation", productPreparationSchema);
