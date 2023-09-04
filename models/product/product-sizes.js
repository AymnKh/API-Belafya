const mongoose = require("mongoose");

const productSizesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  age: { type: String },
  weight: { type: String },
});

module.exports = mongoose.model("Sizes", productSizesSchema);
