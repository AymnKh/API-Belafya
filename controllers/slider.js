const Slider = require("../models/slider");
const Http = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { addImage, deleteImage } = require("../helpers/aws");
module.exports = {
  async addSlider(req, res) {
    if (!req.file) {
      // if no file is selected
      return res // return error
        .status(Http.StatusCodes.NOT_FOUND)
        .json(req.t("Image_required")); // Image is required
    }
    const image = await addImage(req.file);
    const imageUrl = process.env.IMAGE_URL + req.file.originalname; // create imageURL
    const slider = {
      imageUrl: imageUrl,
      imageName: req.file.originalname,
    };
    Slider.create(slider) // create slider
      .then((result) => {
        res.status(Http.StatusCodes.CREATED).json(req.t("success")); // add successs
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // add failed
      });
  },
  getAllSlides(req, res) {
    Slider.find() // find all sliders
      .select("-__v")
      .then((sliders) => {
        res.status(Http.StatusCodes.OK).json(sliders); // return sliders
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // return error
      });
  },
  async deleteAllSlides(req, res) {
    const allSliders = await Slider.find();
    if (!allSliders) {
      return res.status(Http.StatusCodes.NOT_FOUND).json({
        // if no sliders are found, return error
        message: req.t("notFound"),
      });
    }
    allSliders.forEach(async (slide) => {
      const imageDelete = await deleteImage(slide.imageName);
    }); // delete all images from AWS Bucket
    Slider.deleteMany({}) // delete all sliders
      .then((result) => {
        res.status(Http.StatusCodes.OK).json(req.t("success")); // all slides deleted
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // delete failed
      });
  },
  async deleteSliderById(req, res) {
    const id = req.params.id; // get id from params
    if (!isValidObjectId(id)) {
      // if id is not valid
      return res.status(Http.StatusCodes.BAD_REQUEST).json({
        message: req.t("Invalid_id"), // invalid id
      });
    }
    const slider = await Slider.findById(id); // find slider by id
    if (!slider) {
      return res.status(Http.StatusCodes.NOT_FOUND).json(req.t("notFound")); // slider not found
    }
    const imageDelete = await deleteImage(slider.imageName); // delete image from AWS Bucket
    Slider.findByIdAndDelete(id) // delete slider by id
      .then((result) => {
        res.status(Http.StatusCodes.OK).json(req.t("success")); // delete success
      })
      .catch((err) => {
        res
          .status(Http.StatusCodes.INTERNAL_SERVER_ERROR)
          .json(req.t("failed")); // delete failed
      });
  },
};
