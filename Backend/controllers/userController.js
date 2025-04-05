const {
  editProfileService,
  logoutService,
  isloginService,
  postItemService,
} = require("../services/userService");
const { errorResponse, successResponse } = require("../utils/responseUtils");

exports.editProfileController = async (req, res) => {
  const {
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
  } = req.body.profile;
  const { userId } = req.user;
  try {
    const result = await editProfileService(
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
    );
    res.status(200).json(successResponse(result, "Profile Updated successful"));
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.logoutController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const result = await logoutService(authHeader);
    res.status(200).json(successResponse(result, "Logged Out successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.isloginController = async (req, res) => {
  try {
    const { userId } = req.user;
    const result = await isloginService(userId);
    res.status(200).json(successResponse(result, "User Already Logged in"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.postItemController = async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    subcategory,
    location,
    ownerId,
    images,
  } = req.body;
  const { userId } = req.user;
  try {
    const result = await postItemService(
      title,
      description,
      price,
      category,
      subcategory,
      location,
      ownerId,
      userId,
      images
    );
    res.status(200).json(successResponse(result, "Item added successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};
