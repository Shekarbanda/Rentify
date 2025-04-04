const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  signupOwnerController,
} = require("../controllers/authController");

router.post("/signup", signupUser);

router.post("/login", loginUser);


module.exports = router;
