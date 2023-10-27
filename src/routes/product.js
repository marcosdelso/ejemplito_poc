const express = require("express");
const productSchema = require("../models/product");
const orderSchema = require("../models/order");

const router = express.Router();

// Crear un producto
router.post("/products", async (req, res) => {
  try {
    const { code, description, price } = req.body;

    const product = new productSchema({ code, description, price });
    const savedProduct = await product.save();

    return res.json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get one product
router.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    productSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});


// get all products
router.get("/products", (req, res) => {
    productSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });


module.exports = router;
