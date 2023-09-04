const express = require("express");
const categories = require("../controllers/categories");
const router = express.Router();
const upload = require("../helpers/imageUpload");

//categories routes
router.post("/add", upload.single("image"), categories.addCategory);
router
  .route("/")
  .get(categories.getAllCategories)
  .delete(categories.deleteAllCategories);
router
  .route("/:id")
  .get(categories.getCategoryById)
  .delete(categories.deleteCategory);

module.exports = router;
