const path = require("path");

const express = require("express");

const userAccounts = require("../controllers/userAccounts");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/login", userAccounts.login);
router.get("/register", userAccounts.getRegister);
router.post("/auth", userAccounts.getAuth);
router.get("/browse", userController.getBrowse);

module.exports = router;
