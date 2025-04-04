const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  editProfileController,
  logoutController,
  isloginController,
  postItemController,
} = require("../controllers/userController");

router.post("/edit-profile", editProfileController);

router.post("/logout", logoutController);

router.post("/islogin", isloginController);

router.post("/post-item", postItemController);

module.exports = router;
