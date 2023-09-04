const express = require("express");

const router = express.Router();

const subCategories = require("../controllers/sub-categories");

//subCategories routes

router.post("/add", subCategories.addSubCategory);
router.route("/").get(subCategories.getSubCategories).delete(subCategories.deleteAllSubCategories);
router.delete("/:id",subCategories.deleteSubCategory);
router.get("/category/:category", subCategories.getSubCategoryByCategory);

module.exports = router;
