const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, required: true},
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
    payment_method: { type: String, default: "N/A" },
    transaction_id: { type: String, default: "N/A" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", PaymentSchema);
