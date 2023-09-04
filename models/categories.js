const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  name: {
    type: String,
    required: ["true", "Category name is required"],
  },
  name_ar: {
    type: String,
    required: ["true", "Category arabic name is required"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
