const express = require("express");
const product = require("../../controllers/product/product");
const router = express.Router();
const upload = require("../../helpers/imageUpload");

//products routes
router.post("/add", upload.single("image"),product.addProduct);
router.route('/').get(product.getAllProducts).delete(product.deleteAllProducts);
router.route('/:id').get(product.getProductById).delete(product.deleteProductById); 


module.exports = router;
