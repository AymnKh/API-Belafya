const Http = require("http-status-codes");
const SubCategory = require("../models/sub-categories");
const { filter } = require("../helpers/productsHelper");
const { isValidObjectId } = require("mongoose");
module.exports = {
  addSubCategory(req, res) {
    let products = req.body.products.split(",");
    const subCategory = {
      //create new sub categoru object
      name: req.body.name,
      name_ar: req.body.name_ar,
      category: req.body.category,
      products: products,
    };
    SubCategory.create(subCategory) // create a new subCategory
      .then((result) => {
        // successfully
        return res.status(Http.StatusCodes.CREATED).json(req.t("success")); // return success
      })
      .catch((err) => {
        //  fails
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return failed
      });
  },
  getSubCategories(req, res) {
    const lang = req.headers["accept-language"]; // get lang from headers
    const country = req.headers["country"]; // get country from headers
    SubCategory.find({})
      .populate("category")
      .populate("products")
      // .populate({
      //   path: "products",
      //   populate: {
      //     path: "sizes head cutting preparation donationSide donationStatus",
      //   },
      // })
      .then((result) => {
        if (lang != "en" && lang != "ar")
          return res.status(Http.StatusCodes.OK).json(result);
        let sub;
        let allSub = [];
        result.forEach((subCategory) => {
          let products = filter(subCategory.products, lang, country);
          sub = {
            _id: subCategory._id,
            name: lang === "ar" ? subCategory.name_ar : subCategory.name,
            category:
              lang === "ar"
                ? subCategory.category.name_ar
                : subCategory.category.name,
            products: products.map((product) => {
              return {
                _id: product._id,
                startPrice: product.startPrice,
                imageUrl: product.imageUrl,
                name: product.name,
              };
            }),
          }; // filter products based on lang
          allSub.push(sub); // push single sub category to all sub categories
        });
        return res.status(Http.StatusCodes.OK).json(allSub);
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed"));
      });
  },
  getSubCategoryByCategory(req, res) {
    const category = req.params.category; // get category from params
    const lang = req.headers["accept-language"]; // get lang from headers
    const country = req.headers["country"]; // get country from headers
    SubCategory.find({ category: category }) // find products by category
      .populate("products") // populate products
      .populate("category") // populate category
      .then((result) => {
        if (lang != "ar" && lang != "en")
          return res.status(Http.StatusCodes.OK).json(result);
        // result is array of products
        let allSubCategories = []; // create new array to store all products
        let products = []; // create new array to store products
        result.forEach((element) => {
          element.products.forEach((item) => {
            const product = {
              _id: item._id, // product id
              startPrice: item.startPrice, // product start price
              imageUrl: item.imageUrl, // product image
              name: lang === "ar" ? item.name_ar : item.name, // if lang is ar then return name_ar else return name
            };
            products.push(product); // push single product to products array
          });
          const sub = {
            name: lang === "ar" ? element.name_ar : element.name,
            category:
              lang === "ar" ? element.category.name_ar : element.category.name,
            products: products,
          }; // create new sub object
          allSubCategories.push(sub); // push single sub category to all sub categories
          products = []; // reset products array
        });
        return res.status(Http.StatusCodes.OK).json(allSubCategories); // return all subCategories
      })
      .catch((err) => {
        // if error
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); //return error
      });
  },
  deleteSubCategory(req, res) {
    const id = req.params.id; // get id from params
    if (!isValidObjectId(id)) {
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalidId"));
    }
    SubCategory.findByIdAndDelete(id) // find and delete sub category
      .then((result) => {
        // if success
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        // if error
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  deleteAllSubCategories(req, res) {
    SubCategory.deleteMany({}) // delete all sub categories
      .then((result) => {
        // if success
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        // if error
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
};
