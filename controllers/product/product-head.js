const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const ProductHead = require("../../models/product/product-head");
module.exports = {
  addProductHead(req, res) {
    const head = {
      // create a head object
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    ProductHead.create(head) // create a new head
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(result);
        // if head is created successfully, return the created head
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllProductHeads(req, res) {
    ProductHead.find({}) // find all head
      .select("-__v")
      .then((result) => {
        if (result.length == 0) {
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // if no head are found, return error
        }
        return res.status(Http.StatusCodes.OK).json(result); // if head are found, return all head
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  deleteAllProductHeads(req, res) {
    ProductHead.deleteMany()
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // success delete
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteHeadById(req, res) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("Invalid_id")); // if id is not valid, return error
    }
    ProductHead.findByIdAndDelete(id)
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
