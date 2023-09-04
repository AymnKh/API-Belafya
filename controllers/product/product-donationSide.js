const Http = require("http-status-codes");
const ProductDonationSide = require("../../models/product/product-donationSide");
const { isValidObjectId } = require("mongoose");

module.exports = {
  addProductDonationSide(req, res) {
    const donationSide = {
      // create a donationSide object
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    ProductDonationSide.create(donationSide) // create a new donationSide
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result);
        // if donationSide is created successfully, return the created donationSide
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductDonationSide(req, res) {
    ProductDonationSide.find({}) // find all donationSide
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no donationSide are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if donationSide are found, return all donationSide
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  deleteAllProductDonationSide(req, res) {
    ProductDonationSide.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // success delete
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteDonationSideById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("Invalid_id")); // if id is not valid, return error
    }
    ProductDonationSide.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          return res
            .status(Http.StatusCodes.NOT_FOUND)
            .json(req.t("notFound")); // if id is not valid, return error
        }
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
};
