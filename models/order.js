const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    deviceId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    // orderItems: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "OrderItem",
    //   },
    // ],
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sizes",
        },
        head: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Head",
        },
        cutting: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cutting",
        },
        preparation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Preparation",
        },
        donationSide: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DonationSide",
        },
        donationStatus: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DonationStatus",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);

// {
//   "name": "moka",
//     "phone": 123456789,
//     "address": "1234",
//     "city": "1234",
//     "order": [
//      {
//         "product": "644e447334e0510cfd153caf",
//         "quantity": 2,
//         "size": "644e421b620748f8baf27848",
//         "head": "643cb6299ac9bea1a52bb827",
//         "cutting": "644e4099672a9ddd2696d97a",
//         "preparation": "644e3ded672a9ddd2696d956",
//       },
//      {
//         "product": "64537d4c7208446dce2d8d88",
//         "quantity": 1,
//         "size": "64537bca3eeb55e7bc966c75",
//         "preparation": "64537c82340b27b3379bd3ea",
//       },
//     ],
//     "totalPrice": 1234,
//     "notes": "1234"

// }
