const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
});

module.exports = mongoose.model("Slider", sliderSchema);
