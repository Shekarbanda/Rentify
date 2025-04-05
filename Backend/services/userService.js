const { ROLES } = require("../config/constants");
const User = require("../models/userModel");
const Item = require("../models/ItemModel");
const { generateJwtToken } = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

function isValidMobileNumber(mobile) {
  const regex = /^[5-9]\d{9}$/;
  return regex.test(mobile);
}

function isValidUpiId(upiId) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  return regex.test(upiId);
}

exports.editProfileService = async (
  userId,
  name,
  about,
  phone,
  location,
  businessName,
  businessAddress,
  profileImage,
  upi_id,
  password,
  oldPassword
) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new Error("User with this Email not Exists.");
  }
  if (phone) {
    if (!isValidMobileNumber(phone)) {
      throw new Error("Invalid Mobile Number");
    }
  }
  if (upi_id) {
    if (!isValidUpiId(upi_id)) {
      throw new Error("Invalid upiId Number");
    }
  }
  if (oldPassword) {
    const isPasswordValid = await existingUser.comparePassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("old password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateFields = {
      password: hashedPassword,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });
    return { user: updatedUser };
  }
  

  let profileImageUrl = existingUser.profileImage; // Keep existing image if not provided

  // ✅ Upload new image to Cloudinary if provided
  if (profileImage) {
    const uploadedResponse = await cloudinary.uploader.upload(profileImage, {
      folder: "profile_images", // Cloudinary folder to store images
      transformation: [{ width: 300, height: 300, crop: "fill" }], // Resize image
    });
    profileImageUrl = uploadedResponse.secure_url; // Get the uploaded image URL
  }

  // ✅ Create an object with only provided fields
  const updateFields = {
    name,
    phone,
    about,
    location,
    businessName,
    businessAddress,
    upi_id,
  };
  if (profileImageUrl) updateFields.profileImage = profileImageUrl;

  // ✅ Update the user profile in the database
  const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true,
  });

  return { user: updatedUser };
};

exports.logoutService = (authHeader) => {
  if (!authHeader) {
    throw new Error("No token is provided");
  }

  const token = authHeader.split(" ")[1];

  return { message: "Logged out successfully" };
};

exports.isloginService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User Not Found.");
  }

  return { user };
};

exports.postItemService = async ({
  title,
  description,
  price,
  category,
  subcategory,
  location,
  ownerId,
  userId,
  images
}) => {
  let imageUrls = [];

  // ✅ Upload each image to Cloudinary if provided
  if (images && images.length > 0) {
    try {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, {
          folder: "item_images", // Cloudinary folder to store images
          transformation: [{ width: 500, height: 500, crop: "fill" }], // Resize image
        })
      );

      const uploadedResponses = await Promise.all(uploadPromises);
      imageUrls = uploadedResponses.map((response) => response.secure_url);
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  }

  const newItem = new Item({
    title,
    description,
    price,
    category,
    subcategory,
    location,
    images: imageUrls, // Store array of image URLs
    ownerId: ownerId || userId,
  });

  await newItem.save();
  return newItem;
};
