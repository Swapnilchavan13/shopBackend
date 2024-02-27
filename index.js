const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3010;

const Shopdata = require("./models/Shopdata");
const Userdata = require("./models/User");
const Order = require("./models/Order");

// MongoDB Connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));

// Simple get request
app.get("/", (req, res) => {
  res.send("Hello Shop");
});

// Register User Data
app.post("/userdata", async (req, res) => {
  const { username, usernumber, userpassword } = req.body;

  try {
    // Check if the user already exists based on username and mobile number
    const existingUser = await Userdata.findOne({ usernumber });

    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
    } else {
      // If the user doesn't exist, create a new entry
      const newData = new Userdata({
        username,
        usernumber,
        userpassword,
      });
      await newData.save();
      console.log("New User Data Saved");
      res.status(200).json({ message: "New User Data saved" });
    }
  } catch (err) {
    console.error("Error Saving User Data", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// All User Data
app.get("/allusers", async (req, res) => {
  try {
    const allusers = await Userdata.find();
    res.status(200).json(allusers);
  } catch (err) {
    console.error("Error Fetching Data", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a user
app.delete("/allusers/:userId", async (req, res) => {
  const userId = req.params.userId;
  res.status(200).json({ message: "User deleted successfully" });
  try {
    const deletedUser = await Userdata.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error Deleting User", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Post Shop details
app.post("/addShop", async (req, res) => {
  const {
    uid,
    title,
    location,
    description,
    category,
    cost,
    screen,
    remark,
    ownerName,
    phoneNo,
    dailyFootfall,
    image_one,
    image_three,
    image_four,
    image_five,
    video_one,
    price1,
    image_two,
    price2,
    price3,
    price4,
    price5,
    title1,
    title2,
    title3,
    title4,
    title5,
  } = req.body;

  try {
    // Create a new shop instance
    const newShop = new Shopdata({
      uid,
      title,
      location,
      description,
      remark,
      ownerName,
      phoneNo,
      cost,
      screen,
      category,
      dailyFootfall,
      image_one,
      image_two,
      image_three,
      image_four,
      image_five,
      video_one,
      price1,
      price2,
      price3,
      price4,
      price5,
      title1,
      title2,
      title3,
      title4,
      title5,
    });

    // Save the shop to the database
    await newShop.save();

    // Respond with a success message or any other relevant data
    res.json({ message: "Shop added successfully" });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to retrieve all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({}).exec();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// All shops data
app.get("/allshops", async (req, res) => {
  try {
    const allShops = await Shopdata.find();
    res.json(allShops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get details of a single shop by ID
app.get("/allshops/:id", async (req, res) => {
  const shopId = req.params.id;

  try {
    const singleShop = await Shopdata.findById(shopId);
    if (!singleShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.json(singleShop);
  } catch (error) {
    console.error("Error fetching single shop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to delete a shop by ID
app.delete("/allshops/:id", async (req, res) => {
  const shopId = req.params.id;

  try {
    // Find the shop by ID and delete it
    const deletedShop = await Shopdata.findByIdAndDelete(shopId);

    if (!deletedShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to handle incoming orders
app.post("/orders", async (req, res) => {
  const { uid,username, selectedProducts, totalCost, paymentOption, paymentStatus, date } =
    req.body;

  try {
    // Check if the user has already ordered the same product
    const existingOrder = await Order.findOne({ uid, selectedProducts }).exec();

    if (existingOrder) {
      return res.status(400).send("You have already ordered this product.");
    }

    // If the order doesn't exist, create a new order
    const newOrder = new Order({
      uid,
      username,
      selectedProducts,
      totalCost,
      paymentOption,
      paymentStatus,
      date
    });

    await newOrder.save();
    res.status(200).send("Order saved successfully");
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Error saving order");
  }
});

// API endpoint to retrieve all orders
app.get("/orders", (req, res) => {
  Order.find({}, (err, orders) => {
    if (err) {
      res.status(500).send("Error fetching orders");
    } else {
      res.status(200).json(orders);
    }
  });
});

// API endpoint to delete an order by ID
app.delete("/orders/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    // Find the order by ID and delete it
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
