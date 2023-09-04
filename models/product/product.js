const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: ["true", "Product image is required"],
    },
    imageName: { type: String },
    name: {
      type: String,
      required: ["true", "Product name is required"],
    },
    name_ar: {
      type: String,
      required: ["true", "Product arabic name is required"],
    },
    startPrice: {
      type: Number,
    },
    country: { type: String, default: "uae" },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sizes",
      },
    ],
    head: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Head",
      },
    ],
    cutting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cutting",
      },
    ],
    preparation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Preparation",
      },
    ],
    donationSide: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonationSide",
      },
    ],
    donationStatus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DonationStatus",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
