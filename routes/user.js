const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/", userController.getHomePage);

router.post("/user/register", userController.postUserRegister);

router.post("/user/login", userController.postLoginForm);

module.exports = router;
