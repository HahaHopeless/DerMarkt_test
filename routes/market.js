const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();
// router.get("/products", userController.getProducts);

router.get("/", userController.getIndex);
router.get("/browse/search", userController.getProductsByKeyword);
router.get("/browse", userController.getBrowse);
router.post("/add-product", userController.postAddProduct);
// router.get("/login", userController.login);
// router.get("/register", userController.register);
router.get("/productDetails/:id", userController.productDetails);
router.get("/startSelling", userController.addProduct_page);

module.exports = router;
