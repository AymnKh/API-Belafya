const mongoose = require("mongoose");

const productHeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_ar: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Head", productHeadSchema);
