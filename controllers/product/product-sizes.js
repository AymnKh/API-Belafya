const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const ProductSize = require("../../models/product/product-sizes");
module.exports = {
  addProductSize(req, res) {
    const size = {
      // create a size object
      name: req.body.name,
      name_ar: req.body.name_ar,
      price: req.body.price,
      age: req.body.age,
      weight: req.body.weight,
    };
    ProductSize.create(size) // create a new size
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result); // if size is created successfully, return size
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductSizes(req, res) {
    ProductSize.find({}) // find all sizes
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no sizes are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if sizes are found, return all sizes
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); //return error
      });
  },
  deleteAllProductSizes(req, res) {
    ProductSize.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteSizeById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      // if id is not valid, return error
      return res.status(Http.StatusCodes.BAD_REQUEST).json({
        message: req.t("Invalid_id"),
      });
    }
    ProductSize.findByIdAndDelete(id) // find size by id and delete it
      .then((result) => {
        if (!result)
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no result return not found
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("ffailed")); //return error
      });
  },
};
