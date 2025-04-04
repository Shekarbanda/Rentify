const {
  getAllItemsService,
  getItemDetailsService,
  editItemService,
  deleteItemService,
  getUserProfileService,
  getMyAdsService,
  sendRequestService,
  requestsReceivedService,
  requestsSentService,
  requestSendStatusService,
  requestReceiveStatusService,
  cancelRequestService,
  acceptRequestService,
  rejectRequestService,
  paymentService,
  paymentStatusService,
  toggleWishlistService,
  getWishlistService
} = require("../services/ItemService");
const { errorResponse, successResponse } = require("../utils/responseUtils");

//get all items
exports.getAllItemsController = async (req, res) => {
  const { userId } = req.body;
  const { category, search, location } = req.query;
  try {
    const result = await getAllItemsService(userId, category, search, location);
    res
      .status(200)
      .json(successResponse(result, "Items retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

//get item details with item id
exports.getItemDetailsController = async (req, res) => {
  const { itemId } = req.params;
  try {
    const result = await getItemDetailsService(itemId);
    res
      .status(200)
      .json(successResponse(result, "Item Details retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

//edit item details with item id
exports.editItemController = async (req, res) => {
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
  const { itemId } = req.params;
  try {
    const result = await editItemService(
      title,
      description,
      price,
      category,
      subcategory,
      location,
      ownerId,
      userId,
      images,
      itemId
    );
    res.status(200).json(successResponse(result, "Item Updated successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

//delete item with item id
exports.deleteItemController = async (req, res) => {
  const { itemId } = req.params;
  try {
    const result = await deleteItemService(itemId);
    res.status(200).json(successResponse(result, "Item deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.getUserProfileController = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getUserProfileService(userId);
    res
      .status(200)
      .json(successResponse(result, "User details retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.getMyAdsController = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await getMyAdsService(userId);
    res
      .status(200)
      .json(successResponse(result, "Ads are retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.sendRequestController = async (req, res) => {
  const { receiverId, itemId } = req.body;
  const { userId } = req.user;
  try {
    const result = await sendRequestService(userId, receiverId, itemId);
    res.status(200).json(successResponse(result, "Request sent successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.requestsReceivedController = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await requestsReceivedService(userId);
    res
      .status(200)
      .json(successResponse(result, "Requests retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.requestsSentController = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await requestsSentService(userId);
    res
      .status(200)
      .json(successResponse(result, "Requests retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.requestSendStatusController = async (req, res) => {
  const { itemId } = req.body;
  const { userId } = req.user;
  try {
    const result = await requestSendStatusService(userId, itemId);
    res
      .status(200)
      .json(successResponse(result, "Request status retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};
exports.requestReceiveStatusController = async (req, res) => {
  const { itemId } = req.body;
  const { userId } = req.user;
  try {
    const result = await requestReceiveStatusService(userId, itemId);
    res
      .status(200)
      .json(successResponse(result, "Request status retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.cancelRequestController = async (req, res) => {
  const { requestId } = req.params;
  try {
    const result = await cancelRequestService(requestId);
    res
      .status(200)
      .json(successResponse(result, "Request cancelled successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.acceptRequestController = async (req, res) => {
  const { requestId } = req.params;
  try {
    const result = await acceptRequestService(requestId);
    res
      .status(200)
      .json(successResponse(result, "Request accepted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.rejectRequestController = async (req, res) => {
  const { requestId } = req.params;
  try {
    const result = await rejectRequestService(requestId);
    res
      .status(200)
      .json(successResponse(result, "Request rejected successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.paymentController = async (req, res) => {
  const { reqid,amount } = req.body;
  const user = req.user;
  try {
    const result = await paymentService(reqid,user,amount);
    res
      .status(200)
      .json(successResponse(result, "Payment successful"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.paymentStatusController = async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await paymentStatusService(orderId);
    res
      .status(200)
      .json(successResponse(result, "Payment successful"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.getWishlistController = async (req, res) => {
  const { userId } = req.user;
  try {
    const result = await getWishlistService(userId);
    res
      .status(200)
      .json(successResponse(result, "Wishlist Items retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};

exports.toggleWishlistController = async (req, res) => {
  const { userId } = req.user;
  const {itemId} = req.params;
  try {
    const result = await toggleWishlistService(userId, itemId);
    res
      .status(200)
      .json(successResponse(result, result.message));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(error.message || "Internal server error"));
  }
};