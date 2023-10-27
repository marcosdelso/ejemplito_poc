const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderNumber: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  }
});

module.exports = mongoose.model('Order', orderSchema);