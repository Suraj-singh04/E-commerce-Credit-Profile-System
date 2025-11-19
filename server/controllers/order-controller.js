const Order = require("../models/Order");
const Customer = require("../models/Customer");
const { updateScore } = require("../lib/scoringEngine");

const handleOrder = async (req, res) => {
  try {
    const { items, amount, merchantId } = req.body;
    const customerId = req.user.customerId;

    if (!customerId)
      return res.status(400).json({ message: "No customer profile attached" });

    const order = await Order.create({
      customerId,
      merchantId: merchantId || "demo-store",
      amount,
      status: "paid", // for simulation, allow 'failed' or 'returned'
    });

    // update customer summary fields
    const orders = await Order.find({ customerId });
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((s, o) => s + (o.amount || 0), 0);
    const returnRate =
      orders.filter((o) => o.status === "returned").length /
      Math.max(1, totalOrders);
    const successRate =
      orders.filter((o) => o.status === "paid").length /
      Math.max(1, totalOrders);

    await Customer.findByIdAndUpdate(customerId, {
      $set: {
        totalOrders,
        totalSpent,
        returnRate,
        paymentSuccessRate: successRate,
        lastActive: new Date(),
      },
    });

    const customer = await Customer.findById(customerId);
    const recentOrders = await Order.find({ customerId }).sort({
      createdAt: -1,
    });
    const newScore = await updateScore(customer, recentOrders);

    res.json({ order, newScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

module.exports = handleOrder;
