const Http = require("http-status-codes");
const ProductCutting = require("../../models/product/product-cutting");
const { isValidObjectId } = require("mongoose");

module.exports = {
  addProductCutting(req, res) {
    const cutting = {
      // create a cutting object
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    ProductCutting.create(cutting) // create a new cutting
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result);
        // if cutting is created successfully, return the created cutting
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductCutting(req, res) {
    ProductCutting.find({}) // find all cutting
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no cutting are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if cutting are found, return all cutting
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  deleteAllProductCutting(req, res) {
    ProductCutting.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // success delete
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteCuttingById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("Invalid_id")); // if id is not valid, return error
    }
    ProductCutting.findByIdAndDelete(id)
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
