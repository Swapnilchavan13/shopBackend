const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3010;

const Shopdata = require("./models/Shopdata");

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


// Post Shop details
app.post('/addShop', async (req, res) => {
    const { title, location, description, category } = req.body;
  
    try {
      // Create a new shop instance
      const newShop = new Shopdata({
        title,
        location,
        description,
        category,
      });
  
      // Save the shop to the database
      await newShop.save();

      // Respond with a success message or any other relevant data
      res.json({ message: 'Shop added successfully' });
    } catch (error) {
      console.error('Error adding shop:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

     // All shops data
  app.get('/allShops', async (req, res) => {
    try {
      const allShops = await Shopdata.find();
      res.json(allShops);
    } catch (error) {
      console.error('Error fetching shops:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Start the Server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});