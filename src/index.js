const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const clientRoute = require("./routes/client");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const productOrderSchema = require("./routes/productOrder");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", clientRoute);
app.use("/api", orderRoute);
app.use("/api", productRoute);
app.use("/api", productOrderSchema);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
