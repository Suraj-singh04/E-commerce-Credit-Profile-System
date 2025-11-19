require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectToDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo connection failed:", err));

const scoreRoutes = require("./routes/scoreRoute");
const authRoutes = require("./routes/authRoute");
const orderRoutes = require("./routes/orderRoute");
const boostRoutes = require("./routes/boostRoute");

app.use("/api/customers", scoreRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/boosts", boostRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
