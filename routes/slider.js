const express = require("express");
const upload = require("../helpers/imageUpload");
const slider = require("../controllers/slider");
const router = express.Router();

//slider routes
router.post("/add", upload.single("imageUrl"), slider.addSlider); 
router.route("/").get(slider.getAllSlides).delete(slider.deleteAllSlides); 
router.delete("/:id", slider.deleteSliderById); 

module.exports = router;
