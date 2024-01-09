const mongoose = require('mongoose');

// Create a mongoose schema for the shop model
const shopSchema = new mongoose.Schema({
  uid: String,
  title: String,
  location: String,
  description: String,
  category: String,
  image_one: String,
  image_two: String,
  image_three: String,
  image_four: String,
  image_five: String,
});

// Create a mongoose model based on the schema
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
