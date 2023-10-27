const express = require("express");
const orderSchema = require("../models/order");
const clientSchema = require("../models/client");

const router = express.Router();

// create order for a client
router.post("/orders", async (req, res) => {
  try {
    const { orderNumber, orderDate, clientId } = req.body;

    // Verifica si el cliente existe
    const client = await clientSchema.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Crea la orden y asóciala al cliente
    const order = new orderSchema({ orderNumber, orderDate, client: clientId });
    await order.save();

    // Agrega la orden al cliente
    client.orders.push(order._id);
    await client.save();

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get an order
router.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    orderSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

// delete an order
router.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Encuentra la orden que se va a eliminar
    const order = await orderSchema.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Encuentra el cliente asociado a la orden
    const clientId = order.client;

    // Elimina la orden
    await order.remove();

    // Encuentra al cliente
    const client = await clientSchema.findById(clientId);

    if (client) {
      // Filtra la orden eliminada de la lista de pedidos del cliente
      client.orders = client.orders.filter((orderId) => orderId.toString() !== id);
      await client.save();
    }

    return res.json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});



module.exports = router;
