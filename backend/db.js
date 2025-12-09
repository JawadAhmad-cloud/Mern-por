// Import the mongoose library, which is an ODM (Object Data Modeling) library for MongoDB and Node.js
const mongoose = require("mongoose");

// MongoDB connection URI (Uniform Resource Identifier)
// "mongodb://localhost:27017/db" means:
// - mongodb:// → protocol
// - localhost → MongoDB is running on your local machine
// - 27017 → default MongoDB port
// - db → name of the database you want to connect to
const mongoURI = "mongodb://localhost:27017/db";

// Define an asynchronous function to connect to MongoDB
const connectToMongo = async () => {
  try {
    // Try connecting to MongoDB using mongoose.connect
    // The options (useNewUrlParser, useUnifiedTopology) ensure compatibility with newer MongoDB drivers
    // await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true, // Use new MongoDB connection string parser
    //   useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    // });
    await mongoose.connect(mongoURI);

    // If connection succeeds, log success message
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    // If connection fails, catch the error and log it
    console.error("❌ MongoDB connection error:", error.message);
    // Do not exit the process here so the server can start and return
    // helpful error responses instead of crashing the whole app.
    // In production you may want to retry connecting or fail fast.
  }
};

// Export the connectToMongo function so it can be imported and used in other files
module.exports = connectToMongo;
