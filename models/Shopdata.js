const mongoose = require('mongoose');

// Create a mongoose schema for the shop model
const shopSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  category: String,
});

// Create a mongoose model based on the schema
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
