const Customer = require("../models/Customer");
const { updateScore } = require("../lib/scoringEngine");
const Order = require("../models/Order");

const BOOST_MAP = {
  phoneVerified: 10,
  cardLinked: 5,
  verifiedReview: 5,
  onTimePayment: 10,
};

const boostScore = async (req, res) => {
  try {
    const { booster } = req.params;
    const customerId = req.user.customerId;
    const cust = await Customer.findById(customerId);
    if (!cust) return res.status(404).json({ message: "Customer not found" });

    // Update flags or counters
    if (booster === "phoneVerified") {
      cust.boosters.phoneVerified = true;
    } else if (booster === "cardLinked") {
      cust.boosters.cardLinked = true;
    } else if (booster === "verifiedReview") {
      cust.boosters.verifiedReviews = (cust.boosters.verifiedReviews || 0) + 1;
    } else if (booster === "onTimePayment") {
      cust.boosters.onTimePayments = (cust.boosters.onTimePayments || 0) + 1;
    } else {
      return res.status(400).json({ message: "Unknown booster" });
    }

    // Save and compute score
    await cust.save();
    const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
    const newScore = await updateScore(cust, orders);
    res.json({ success: true, newScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booster failed" });
  }
};

module.exports = boostScore;
