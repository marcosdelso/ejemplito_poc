const mongoose = require("mongoose");

const productOrderSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

module.exports = mongoose.model('ProductOrder', productOrderSchema);
