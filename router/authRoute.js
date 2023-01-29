const express = require("express");
const Router = express.Router();
const controller = require("../controllers/authController");


router.get("/signup", controller.signup_get);

router.post("/signup", controller.signup_post);

router.get("/login", controller.login_get);

router.post("/login", controller.login_post);

router.get("/logout", controller.logout);

router.get("/user/:username", controller.userInfo);
module.exports = router;
