const mongoose = require('mongoose');

// Create a mongoose schema for the shop model
const shopSchema = new mongoose.Schema({
  uid: String,
  date: String,
  userName: String,
  title: String,
  location: String,
  description: String,
  remark: String,
  ownerName: String,
  phoneNo:String,
  category: String,
  cost: Number,
  screen: Number,
  dailyFootfall: String,
  image_one: String,
  image_two: String,
  image_three: String,
  image_four: String,
  image_five: String,
  video_one:String,
  price1: String,
  price2: String,
  price3: String,
  price4: String,
  price5: String,
  title1: String,
  title2: String,
  title3: String,
  title4: String,
  title5: String
});

// Create a mongoose model based on the schema
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
