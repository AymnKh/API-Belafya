const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { filter } = require("../../helpers/productsHelper");
const Product = require("../../models/product/product");
const { addImage } = require("../../helpers/aws");
module.exports = {
  async addProduct(req, res) {
    if (!req.file) {
      // if no image is uploaded
      return res
        .status(Http.StatusCodes.CONFLICT)
        .json(req.t("Image_required")); // return error
    }
    const sizes = req.body.sizes ? req.body.sizes.split(",") : []; // split sizes string to array
    const head = req.body.head ? req.body.head.split(",") : []; // split head string to array
    const cutting = req.body.cutting ? req.body.cutting.split(",") : []; // split cutting string to array
    const preparation = req.body.preparation
      ? req.body.preparation.split(",")
      : []; // split preparation string to array
    
    const donationSide = req.body.donationSide ? req.body.donationSide.split(",") : []; // split donationSide string to array
    const donationStatus = req.body.donationStatus ? req.body.donationStatus.split(",") : []; // split donationStatus string to array


    const image = await addImage(req.file); // upload image to AWS Bucket
    const imageUrl = process.env.IMAGE_URL + req.file.originalname; // create imageURL
    const product = new Product({
      // create a product object
      imageUrl: imageUrl,
      imageName: req.file.originalname,
      name: req.body.name,
      startPrice: req.body.startPrice,
      name_ar: req.body.name_ar,
      country: req.body.country,
      sizes: sizes,
      head: head,
      cutting: cutting,
      preparation: preparation,
      donationSide: donationSide,
      donationStatus: donationStatus,
    });
    Product.create(product) // create a new product
      .then((result) => {
        return res.status(Http.StatusCodes.CREATED).json(req.t("success")); //create successfuly
      })
      .catch((err) => {
        // if product creation fails
        return res.status(Http.StatusCodes.INTERNAL_SERVER_ERROR).json(req.t('failed')); //return error
      });
  },
  getAllProducts(req, res) {
    const lang = req.headers["accept-language"]; // get lang from headers
    const country = req.headers["country"]; // get country from headers
    let filterItems;
    country ? (filterItems = { country: country }) : {};
    Product.find(filterItems) // find all products
      .populate([
        "sizes",
        "head",
        "cutting",
        "preparation",
        "donationStatus",
        "donationSide",
      ]) // populate sizes and other options
      .then((result) => {
        if (lang != "ar" && lang != "en") 
          return res.status(Http.StatusCodes.OK).json(result);
        // result is array of products
        const allProducts = filter(result, lang, country); // filter products by lang and country
        return res.status(Http.StatusCodes.OK).json(allProducts); // return all products
      })
      .catch((err) => {
        // if error
        res.status(Http.StatusCodes.INTERNAL_SERVER_ERROR).json(req.t('failed')); //return error
      });
  },
  getProductById(req, res) {
    const id = req.params.id; // get id from params
    const lang = req.headers["accept-language"]; // get lang from headers
    const country = req.headers["country"]; // get country from headers
    if (!isValidObjectId(id)) {
      // if id is not valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id")); // return bad request
    }
    Product.find({ _id: id })
      .populate([
        "sizes",
        "head",
        "cutting",
        "preparation",
        "donationStatus",
        "donationSide",
      ])
      .then((result) => {
        if (!result) {
          // if no product found
          return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return not found
        }
        const product = filter(result, lang, country); // filter product by lang
        return res.status(Http.StatusCodes.OK).json(product[0]); // return product
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ err: err.message }); //return error
      });
  },
  async deleteAllProducts(req, res) {
    const allProducts = await Product.find(); // find all products
    allProducts.forEach(async (product) => {
      const deleteImage = await deleteImage(product.imageName); // delete image from AWS Bucket
    });
    Product.deleteMany() // delete all products
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); //return error
      });
  },
  async deleteProductById(req, res) { 
    const id = req.params.id; // get id from params
    if (!isValidObjectId(id)) {
      // if id is not valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json(req.t("invalid_id")); // return bad request
    }
    const product = await Product.findById(id); // find product by id
    if (!product) {
      // if no product found
      return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // return not found
    }
    const deleteImage = await deleteImage(product.imageName); // delete image from AWS Bucket
    Product.findByIdAndDelete(id) // delete product by id
      .then((result) => {
        return res.status(Http.StatusCodes.OK).json(req.t("success")); // return success
      })
      .catch((err) => {
        return res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); //return error
      });
   }
};
