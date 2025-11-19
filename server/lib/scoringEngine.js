const Score = require("../models/Score");

function calculateScore(customer, orders) {
  let score = 50;

  // Basic dynamic factors
  if (customer.totalOrders > 5) score += 10;
  if (customer.returnRate < 0.1) score += 10;
  if (customer.paymentSuccessRate > 0.9) score += 10;
  if (customer.chargebacks > 0) score -= 15;
  if (customer.boosters?.phoneVerified) score += 10;
  if (customer.boosters?.cardLinked) score += 5;
  score += Math.min(20, (customer.boosters?.onTimePayments || 0) * 5); // cap
  score += Math.min(10, (customer.boosters?.verifiedReviews || 0) * 2);

  const recentOrder = orders[0];
  if (
    recentOrder &&
    (Date.now() - recentOrder.createdAt.getTime()) / (1000 * 3600 * 24) > 30
  )
    score -= 5;

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  let level = "Medium";
  if (score >= 80) level = "High";
  else if (score <= 40) level = "Low";

  const reasons = [];
  if (customer.returnRate > 0.2) reasons.push("High return rate");
  if (customer.paymentSuccessRate < 0.8) reasons.push("Low payment success");
  if (customer.chargebacks > 0) reasons.push("Chargeback history");
  if (reasons.length === 0) reasons.push("Good transaction history");

  return { score, level, reasons };
}

async function updateScore(customer, orders) {
  const result = calculateScore(customer, orders);
  const scoreDoc = await Score.create({
    customerId: customer._id,
    score: result.score,
    level: result.level,
    reasons: result.reasons,
    modelVersion: "rule-v1",
  });
  return scoreDoc;
}

module.exports = { calculateScore, updateScore };
