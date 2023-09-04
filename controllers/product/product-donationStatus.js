const Http = require("http-status-codes");
const ProductDonationStatus = require("../../models/product/product-donationStatus");
const { isValidObjectId } = require("mongoose");

module.exports = {
  addProductDonationStatus(req, res) {
    const donationStatus = {
      // create a donationStatus object
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    ProductDonationStatus.create(donationStatus) // create a new donationStatus
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result);
        // if donationStatus is created successfully, return the created donationStatus
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductDonationStatus(req, res) {
    ProductDonationStatus.find({}) // find all donationStatus
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no donationStatus are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if donationStatus are found, return all donationStatus
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  deleteAllProductDonationStatus(req, res) {
    ProductDonationStatus.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // success delete
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteDonationStatusById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("Invalid_id")); // if id is not valid, return error
    }
    ProductDonationStatus.findByIdAndDelete(id)
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
