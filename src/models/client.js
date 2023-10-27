//define un modelo de datos para mongoDB utilizando mongoose
const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  dni: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  }]
});

module.exports = mongoose.model('Client', clientSchema); //Este modelo se asocia con la colección "clients" en la base de datos MongoDB.