const mongoose = require("mongoose");
const { ITEM_CATEGORIES, ITEM_STATUSES } = require("../config/constants");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "CARS",
      "BIKES",
      "PROPERTIES",
      "FURNITURE",
      "ELECTRONICS",
      "SPORTS",
      "EVENT_RENTALS",
      "SERVICE",
    ],
  },
  subcategory: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  available: {
    type: Boolean,
    default: true,
  },
  rentalPeriod: {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", itemSchema);
