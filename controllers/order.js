const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const Order = require("../models/order");
const { filterOrders } = require("../helpers/orderHelper");
const Size = require("../models/product/product-sizes");
const { validatePhone } = require("../helpers/phoneNumber");

module.exports = {
  async createOrder(req, res) {
    const country = req.headers["country"]; // get country from headers
        if (!validatePhone(req.body.phone, country)) {
      // check if phone number is valid
      return res
        .status(Http.StatusCodes.BAD_REQUEST)
        .json(req.t("invalidPhoneNumber")); // return error
    }
    const totalPrices = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        // get total price for each order item
        const orderItemSize = await Size.findById(orderItem.size);
        const totalPrice = orderItemSize.price * orderItem.quantity; // calculate total price
        return totalPrice; // return total price
      })
    );
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0); // calculate total price for all order items
    const order = {
      // create new order
      deviceId: req.body.deviceId,
      name: req.body.name,
      phone: req.body.phone,
      country: country,
      city: req.body.city,
      address: req.body.address,
      notes: req.body.notes,
      totalPrice: totalPrice, // assign total price to order
      orderItems: req.body.orderItems, // assign order items ids to order
    };

    Order.create(order) // save order
      .then((result) => {
        if (!result) {
          // if order not saved
          return res
            .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(req.t("failed"));
        }
        return res.status(Http.StatusCodes.CREATED).json(req.t("orderCreated")); // return success
      })
      .catch((err) => {
        // if error
        return res.status(Http.StatusCodes.INTERNAL_SERVER_ERROR).json({
          err: err.message, // return error
        });
      });
  },
  getAllOrders(req, res) {
    const lang = req.headers["accept-language"]; // get lang from headers
    Order.find({}) // get all orders
      .populate({
        path: "orderItems",
        populate: {
          path: "product size head cutting preparation donationSide donationStatus",
          select: "_id name name_ar imageUrl price",
        },
      }) // populate order items product
      .then((result) => {
        if (!result) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound"));
        }
        const allOrders = filterOrders(result, lang);
        return res.status(Http.StatusCodes.OK).json(allOrders);
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  getOrderById(req, res) {
    const lang = req.headers["accept-language"]; // get lang from headers
    const orderId = req.params.id; // get order id from params
    if (!isValidObjectId(orderId)) {
      // check if order id is valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id"));
    }
    Order.find({ _id: orderId }) // get order
      .populate({
        path: "orderItems",
        populate: {
          path: "product size head cutting preparation donationSide donationStatus",
          select: "_id name name_ar imageUrl price",
        },
      }) // populate order items product
      .then((result) => {
        if (result.length === 0) {
          // if order not found
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return not found
        }

        const allOrders = filterOrders(result, lang); // filter order
        return res.status(Http.StatusCodes.OK).json(allOrders[0]); // return order
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getOrderByDeviceId(req, res) {
    const deviceId = req.params.id; // get device id from params
    const lang = req.headers["accept-language"]; // get lang from headers
    Order.find({ deviceId: deviceId }) // get order
      .populate({
        path: "orderItems",
        populate: {
          path: "product size head cutting preparation donationSide donationStatus",
          select: "_id name name_ar imageUrl price",
        },
      }) // populate order items product
      .then((result) => {
        if (result.length === 0) {
          // if order not found
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return not found
        }
        const allOrders = filterOrders(result, lang); // filter order
        return res.status(Http.StatusCodes.OK).json(allOrders); // return order
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  async deleteAllOrders(req, res) {
    Order.deleteMany({}) // delete all orders
      .then((result) => {
        if (!result) {
          // if orders not deleted
          return res
            .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
            .json(req.t("failed")); // return error
        }
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteOrderById(req, res) {
    const orderId = req.params.id; // get order id from params
    if (!isValidObjectId(orderId)) {
      // check if order id is valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id")); // return error
    }
    Order.findByIdAndDelete(orderId) // delete order
      .then((result) => {
        if (!result) {
          // if order not deleted
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return error
        }
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  updateOrderStatus(req, res) {
    const orderId = req.params.id; // get order id from params
    if (!isValidObjectId(orderId)) {
      // check if order id is valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id")); // return error
    }
    Order.findByIdAndUpdate(
      orderId, // find order by id
      {
        delivered: req.body.delivered, // update order status
      },
      {
        new: true, // return updated order
      }
    ) // update order status
      .then((result) => {
        // update order status
        if (!result) {
          // if order status not updated
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound"));
        }
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return failed
      });
  },
};
