const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "rentify-images", // Cloudinary folder name
    allowed_formats: ["jpeg", "png", "jpg", "webp"],
    limits: { fieldSize: 10000 * 1024 * 1024 }, // 5MB limit
  },
});

const upload = multer({ storage });

module.exports = upload;
