const Customer = require("../models/Customer");
const Order = require("../models/Order");
const { updateScore } = require("../lib/scoringEngine");

const dynamicScore = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    const orders = await Order.find({ customerId: customer._id }).sort({
      createdAt: -1,
    });
    const result = await updateScore(customer, orders);

    // update customer summary
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((acc, o) => acc + (o.amount || 0), 0);
    const returnRate =
      orders.filter((o) => o.status === "returned").length / (totalOrders || 1);
    const successRate =
      orders.filter((o) => o.status === "paid").length / (totalOrders || 1);

    customer.totalOrders = totalOrders;
    customer.totalSpent = totalSpent;
    customer.returnRate = returnRate;
    customer.paymentSuccessRate = successRate;
    customer.lastActive = new Date();
    await customer.save();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error calculating dynamic score" });
  }
};

module.exports = dynamicScore;
