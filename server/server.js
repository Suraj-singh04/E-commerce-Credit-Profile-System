require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb connected"))
  .catch(() => console.log("Mongo COnnection failed"));

const PORT = process.env.PORT;

app.use(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
