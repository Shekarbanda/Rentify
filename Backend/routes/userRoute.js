const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  editProfileController,
  logoutController,
  isloginController,
  postItemController,
} = require("../controllers/userController");

router.post("/edit-profile",upload.single('profileImage'), editProfileController);

router.post("/logout", logoutController);

router.post("/islogin", isloginController);

router.post("/post-item", upload.array('images',5) , postItemController);

module.exports = router;
