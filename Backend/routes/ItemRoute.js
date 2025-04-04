const express = require("express");
const router = express.Router();

const {
  getAllItemsController,
  getItemDetailsController,
  editItemController,
  deleteItemController,
  getUserProfileController,
  getMyAdsController,
  sendRequestController,
  requestsSentController,
  requestsReceivedController,
  requestSendStatusController,
  requestReceiveStatusController,
  cancelRequestController,
  acceptRequestController,
  rejectRequestController,
  paymentController,
  paymentStatusController,
  toggleWishlistController,
  getWishlistController
} = require("../controllers/itemController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/get-all-items", getAllItemsController);
router.get("/get-item-details/:itemId", getItemDetailsController);
router.post("/edit-item/:itemId", authMiddleware, editItemController);
router.delete("/delete-item/:itemId", authMiddleware, deleteItemController);
router.get("/get-user-profile/:userId", getUserProfileController);
router.get("/get-my-ads", authMiddleware, getMyAdsController);
router.post("/send-request", authMiddleware, sendRequestController);
router.post("/requests-sent", authMiddleware, requestsSentController);
router.post("/requests-received", authMiddleware, requestsReceivedController);
router.post(
  "/check-send-request-status",
  authMiddleware,
  requestSendStatusController
);
router.post(
  "/check-receive-request-status",
  authMiddleware,
  requestReceiveStatusController
);
router.post(
  "/cancel-request/:requestId",
  authMiddleware,
  cancelRequestController
);
router.post(
  "/accept-request/:requestId",
  authMiddleware,
  acceptRequestController
);
router.post(
  "/reject-request/:requestId",
  authMiddleware,
  rejectRequestController
);

router.post(
  "/payment",
  authMiddleware,
  paymentController
);

router.get(
  "/payment-status/:orderId",
  authMiddleware,
  paymentStatusController
);

router.post(
  "/toggle-wishlist/:itemId",
  authMiddleware,
  toggleWishlistController
);

router.get(
  "/get-wishlist",
  authMiddleware,
  getWishlistController
);


module.exports = router;
