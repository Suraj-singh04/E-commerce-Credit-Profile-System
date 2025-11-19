const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  deviceId: String,
  createdAt: { type: Date, default: Date.now },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  returnRate: { type: Number, default: 0 },
  paymentSuccessRate: { type: Number, default: 1 },
  chargebacks: { type: Number, default: 0 },
  lastActive: Date,
  boosters: {
    phoneVerified: { type: Boolean, default: false },
    cardLinked: { type: Boolean, default: false },
    verifiedReviews: { type: Number, default: 0 },
    onTimePayments: { type: Number, default: 0 },
  },
  boostsApplied: [{ name: String, points: Number, appliedAt: Date }],
});

module.exports = mongoose.model("Customer", CustomerSchema);
