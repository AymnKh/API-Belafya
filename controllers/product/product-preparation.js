const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const ProductPreparation = require("../../models/product/product-preparation");
module.exports = {
  addProductPreparation(req, res) {
    const preparation = {
      // create a preparation object
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    ProductPreparation.create(preparation) // create a new preparation
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result);
        // if preparation is created successfully, return the created preparation
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductPreparation(req, res) {
    ProductPreparation.find({}) // find all head
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no head are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if preparations are found, return all preparations
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  deleteAllProductPreparation(req, res) {
    ProductPreparation.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // success delete
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deletePreparationById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("Invalid_id")); // if id is not valid, return error
    }
    ProductPreparation.findByIdAndDelete(id)
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
