const mongoose = require("mongoose");

const ItemRequestSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // Item being requested
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Person sending the request
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String, // Optional message
  status: {
    type: String,
    default: "pending",
  },
  endDate:{type: Date, required:true},
  requestDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", ItemRequestSchema);
