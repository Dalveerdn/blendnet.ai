const express = require("express");
const router = express.Router();
const userController = require("../controllers/loginlogout");

router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/user-registration", userController.register);

module.exports = router;
