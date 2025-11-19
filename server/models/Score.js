const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  score: Number,
  level: String,
  reasons: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Score", ScoreSchema);
