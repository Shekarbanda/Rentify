const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }]
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
