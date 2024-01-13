const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  uid: String,
  selectedProducts: Array,
  totalCost: Number,
  paymentOption: String,
  paymentStatus: Boolean,
  date: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
