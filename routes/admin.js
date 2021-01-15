const path = require("path");

const express = require("express");

const userController = require("../controllers/admin");

const router = express.Router();
// router.get("/products", userController.getProducts);

router.get("/admin", userController.getBrowse);
router.post("/approve", userController.getApprove);

module.exports = router;
