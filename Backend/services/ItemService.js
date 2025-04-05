const Item = require("../models/ItemModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const cloudinary = require("../utils/cloudinary");
const Request = require("../models/itemRequestModel");
const axios = require("axios");
const Wishlist = require('../models/wishlistModel')

exports.getAllItemsService = async (userId, category, search, location) => {
  const filter = {};

  if (userId) {
    filter.ownerId = { $ne: userId }; // Exclude logged-in user’s items
  }

  if (category) {
    filter.category = category; // Filter by category
  }

  if (category === "ALL") {
    delete filter.category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } }, // Case-insensitive title search
      { description: { $regex: search, $options: "i" } }, // Case-insensitive description search
    ];
  }

  if (location) {
    filter.location = location;
  }
  if (location === "India") {
    delete filter.location;
  }

  const items = await Item.find(filter).sort({ createdAt: -1 });
  return { items };
};

exports.getItemDetailsService = async (id) => {
  const item = await Item.findById(id).populate(
    "ownerId",
    "-password -updatedAt"
  );
  if (!item) {
    throw new Error("Item not Found.");
  }
  return { item };
};

exports.editItemService = async (
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
) => {
  const existingItem = await Item.findById(itemId);
  if (!existingItem) {
    throw new Error("Item not found");
  }

  // ✅ Check if images are provided, upload new ones if needed
  let imageUrls = existingItem.images; // Keep existing images by default
  if (images && images.length > 0) {
    try {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image, {
          folder: "item_images",
          transformation: [{ width: 500, height: 500, crop: "fill" }],
        })
      );

      const uploadedResponses = await Promise.all(uploadPromises);
      imageUrls = uploadedResponses.map((response) => response.secure_url);
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      throw new Error("Image upload failed");
    }
  }

  // ✅ Update item fields
  existingItem.title = title || existingItem.title;
  existingItem.description = description || existingItem.description;
  existingItem.price = price || existingItem.price;
  existingItem.category = category || existingItem.category;
  existingItem.subcategory = subcategory || existingItem.subcategory;
  existingItem.location = location || existingItem.location;
  existingItem.images = imageUrls;
  existingItem.ownerId = ownerId || userId || existingItem.ownerId;

  // ✅ Save the updated item
  await existingItem.save();
  return existingItem;
};

exports.deleteItemService = async (id) => {
  const item = await Item.findById(id);
  if (!item) {
    throw new Error("Item not Found.");
  }

  // Check if there are any requests for this item
  const requests = await Request.find({ itemId: id, status: "pending" });
  if (requests.length > 0) {
    throw new Error("Failed to delete. There is pending requests on this item");
  }

  // Proceed with deletion if no requests exist
  const itemDeleted = await Item.findByIdAndDelete(id);
  const items = await Item.find({ ownerId: itemDeleted.ownerId });

  return { items };
};

exports.getUserProfileService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid userId");
  }
  const user = await User.findById(id).select("-password -updatedAt");
  if (!user) {
    throw new Error("User not Found.");
  }

  return { user };
};

exports.getMyAdsService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid userId");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not Found.");
  }
  const items = await Item.find({ ownerId: id });

  return { items };
};

exports.sendRequestService = async (senderId, receiverId, itemId) => {
  if (!senderId || !receiverId || !itemId) {
    throw new Error("All fields are required");
  }

  // Check if a request already exists
  const existingRequest = await Request.findOne({
    senderId,
    receiverId,
    itemId,
  });
  if (existingRequest) {
    throw new Error("Request already sent");
  }

  const newRequest = new Request({ senderId, receiverId, itemId });
  await newRequest.save();

  return { newRequest };
};

exports.requestsReceivedService = async (userId) => {
  const receivedRequests = await Request.find({ receiverId: userId })
    .populate("itemId", "title price ")
    .populate("receiverId", "name email")
    .populate("senderId", "name email ");

  return { receivedRequests };
};

exports.requestsSentService = async (userId) => {
  const sentRequests = await Request.find({ senderId: userId })
    .populate("itemId", "title price ")
    .populate("receiverId", "name email")
    .populate("senderId", "name email ");

  return { sentRequests };
};

exports.requestSendStatusService = async (senderId, itemId) => {
  const request = await Request.findOne({ senderId, itemId }).populate(
    "receiverId",
    "profileImage name"
  );
  if (!request) {
    return { status: "not_sent" };
  }
  return {
    status: request.status,
    requestId: request._id,
    receiverId: request.receiverId,
  };
};

exports.requestReceiveStatusService = async (receiverId, itemId) => {
  const request = await Request.findOne({ receiverId, itemId }).populate(
    "senderId",
    "profileImage name"
  );
  if (!request) {
    return { status: "not_sent" };
  }
  return {
    status: request.status,
    requestId: request._id,
    senderId: request.senderId,
  };
};

exports.cancelRequestService = async (requestId) => {
  const request = await Request.findById(requestId);
  if (!request) {
    throw new Error("Request not found");
  }

  const deletedRequest = await Request.findByIdAndDelete(requestId);

  return { deletedRequest };
};

exports.acceptRequestService = async (requestId) => {
  const request = await Request.findById(requestId);
  if (!request) {
    throw new Error("Request not found");
  }

  request.status = "approved";
  await request.save();
  const requests = await Request.find();

  return { requests };
};

exports.rejectRequestService = async (requestId) => {
  const request = await Request.findById(requestId);
  if (!request) {
    throw new Error("Request not found");
  }

  const deletedRequest = await Request.findByIdAndDelete(requestId);

  return { requests:deletedRequest };
};

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_API_URL = process.env.CASHFREE_API_URL;

exports.paymentService = async (requestId,user,amount) => {
  try {
    const uniqueOrderId = `ord_${Date.now()}`; // ✅ Ensure a new order ID every time

    const orderData = {
        order_id: uniqueOrderId,  // ✅ Unique Order ID
        order_amount: amount, 
        order_currency: "INR",
        customer_details: {
            customer_id: user?.userId,
            customer_email: user?.email,
            customer_phone: user?.phone
        },
        order_meta: {
          return_url: "https://rentify-furd.onrender.com/sent-requests" // ✅ Redirect after success
      }
    };

    // ✅ Send request to Cashfree
    const response = await axios.post(CASHFREE_API_URL, orderData, {
        headers: {
            "x-api-version": "2022-09-01",
            "x-client-id": CASHFREE_APP_ID,
            "x-client-secret": CASHFREE_SECRET_KEY,
            "Content-Type": "application/json"
        }
    });

    const newPayment = await Payment.create({
      orderId: orderData.order_id,
      amount: orderData.order_amount,
      currency: orderData.order_currency,
      status: 'pending',
      requestId:requestId,
      userId: orderData?.customer_id,
      createdAt: new Date()
  });

    return { payment_session_id: response.data.payment_session_id, order_id:response.data.order_id };

  } catch (err) {
    console.error("Payment Error:", err.response?.data || err.message);
    return { error: "Failed to create payment session" };
  }
};

exports.paymentStatusService = async (orderId) => {
    try {
        // ✅ Step 1: Fetch Payment Status from Cashfree
        const response = await axios.get(`${CASHFREE_API_URL}/${orderId}`, {
            headers: {
                "x-api-version": "2022-09-01",
                "x-client-id": CASHFREE_APP_ID,
                "x-client-secret": CASHFREE_SECRET_KEY
            }
        });

        // ✅ Step 2: Fetch Payment Record from Database
        const paymentData = await Payment.findOne({ orderId: orderId });
        if (!paymentData) {
            console.error("❌ Payment record not found in database");
            return response.data;
        }

        // ✅ Step 3: If Payment is Successful, Update DB
        if (response?.data?.order_status === "PAID") {

            paymentData.status = "success";  
            await paymentData.save();  

            // ✅ Step 4: Update Request Status
            await Request.findOneAndUpdate(
                { _id: paymentData.requestId },  
                { 
                    status: "completed",  
                    payment_id: paymentData._id  
                }
            );
        } 
        else {
            await Payment.findByIdAndDelete(paymentData._id);
        }

        return response.data;

    } catch (err) {

        const paymentData = await Payment.findOne({ orderId: orderId });
        if (paymentData) {
            await Payment.findByIdAndDelete(paymentData._id);
        }

        throw new Error("Failed to fetch payment status");
    }
};

exports.toggleWishlistService = async(userId,itemId)=>{
  let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const itemIndex = wishlist.items.indexOf(itemId);

    if (itemIndex === -1) {
      wishlist.items.push(itemId);
      await wishlist.save();
      const updatedWishlist = await Wishlist.findOne({ userId }).populate('items');
      return { message: "Item added to wishlist", wishlist:updatedWishlist?.items };
    } else {
      wishlist.items.splice(itemIndex, 1);
      await wishlist.save();
      const updatedWishlist = await Wishlist.findOne({ userId }).populate('items');
      return { message: "Item removed from wishlist", wishlist:updatedWishlist?.items };
    }

}

exports.getWishlistService = async(userId)=>{
    const wishlist = await Wishlist.findOne({userId}).populate('items');

    if(!wishlist){
      return {wishlist};
    }

    return {wishlist:wishlist?.items}

}