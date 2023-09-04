const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const Category = require("../models/categories");
const { addImage, deleteImage } = require("../helpers/aws");
module.exports = {
  async addCategory(req, res) {
    if (!req.file) {
      return res
        .status(Http.StatusCodes.BAD_REQUEST)
        .json(req.t("Image_required")); // if no image is uploaded, return error
    }
    const image = await addImage(req.file); // add image to AWS Bucket
    const imageUrl = process.env.IMAGE_URL + req.file.originalname; // create imageURL
    const category = {
      // create a category object
      imageName: req.file.originalname,
      imageUrl: imageUrl,
      name: req.body.name,
      name_ar: req.body.name_ar,
    };
    Category.create(category) // create a new category
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(req.t("success")); //created successfully
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getAllCategories(req, res) {
    const lang = req.headers["accept-language"]; // get the language from the request header
    Category.find({}) // find all categories
      .select("-__v") // exclude the __v field
      .then((result) => {
        if (!result) {
          // if no categories are found, return error
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound"));
        }
        if (lang != "en" && lang != "ar")
          return res.status(Http.StatusCodes.OK).json(result); // if no language is specified, return all categories with 2 languages
        let categories;
        lang === "en" // if language is specified, return categories in that language
          ? (categories = result.map((category) => {
              // map the categories to return only the required fields
              return {
                _id: category._id,
                imageUrl: category.imageUrl,
                name: category.name, // return the name field in english
              };
            }))
          : (categories = result.map((category) => {
              return {
                _id: category._id,
                imageUrl: category.imageUrl,
                name: category.name_ar, // return the name field in arabic
              };
            }));
        return res.status(Http.StatusCodes.OK).json(categories); // return the categories
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  getCategoryById(req, res) {
    const id = req.params.id; // get the id from the request params
    const lang = req.headers["accept-language"]; // get the language from the request header
    if (!isValidObjectId(id)) {
      // if the id is invalid, return error
      return res.status(Http.StatusCodes.BAD_REQUEST).json({
        message: req.t("invalid_id"),
      });
    }
    Category.findById({ _id: id }) // find the category by id
      .select("-__v") // exclude the __v field
      .then((result) => {
        if (!result) {
          // if no category is found, return error
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound"));
        }
        if (lang != "ar" && lang != "en")
          return res.status(Http.StatusCodes.OK).json(result); // if no language is specified, return all categories with 2 languages
        let category;
        lang === "en" // if language is specified, return category in that language
          ? (category = {
              _id: result._id,
              imageUrl: result.imageUrl,
              name: result.name, // return the name field in english
            })
          : (category = {
              _id: result._id,
              imageUrl: result.imageUrl,
              name: result.name_ar, // return the name field in arabic
            });
        return res.status(Http.StatusCodes.OK).json(category); // return the category
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  async deleteCategory(req, res) {
    const id = req.params.id; // get the id from the request params
    if (!isValidObjectId(id)) {
      // if the id is invalid, return error
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id"));
    }
    const category = await Category.findById({ _id: id }); // find the category by id
    if (!category) {
      // if no category is found, return error
      return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound"));
    }
    const imageDelete = await deleteImage(category.imageName); // delete the image from AWS Bucket
    Category.findByIdAndDelete(id) // delete the category by id
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // if category is deleted successfully, return success message
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  async deleteAllCategories(req, res) {
    const categoreies = await Category.find();
    if (!categoreies) {
      return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return not found
    }
    categoreies.forEach(async (element) => {
      const imageDelete = await deleteImage(element.imageName);
    }); // delete all images from AWS Bucket
    Category.deleteMany({}) // delete all categories from DB
      .then((result) => {
        res.status(Http.StatusCodes.OK).json(req.t("success")); // if categories are deleted successfully, return success message
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
};
