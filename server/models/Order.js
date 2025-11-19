const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  merchantId: String,
  amount: Number,
  status: {
    type: String,
    enum: ["paid", "failed", "returned"],
    default: "paid",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
