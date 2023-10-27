const express = require("express");
const productOrderSchema = require("../models/productOrder");
const Product = require("../models/product");
const Order = require("../models/order");

const router = express.Router();

// Agregar un producto a un pedido
router.post("/productOrder", async (req, res) => {
  try {
    const { productId, orderId } = req.body;

    // Verificar si tanto el producto como la orden existen
    const product = await Product.findById(productId);
    const order = await Order.findById(orderId);

    if (!product || !order) {
      return res.status(404).json({ message: "Producto u orden no encontrados" });
    }

    const productOrder = new productOrderSchema({ productId, orderId });
    await productOrder.save();

    return res.json(productOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
