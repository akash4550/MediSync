import mongoose from "mongoose";

// Function to connect MongoDB using mongoose
const connectDB = async () => {
  try {
    // connect() returns a promise
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // helps avoid hanging if DB is unreachable
    });

    console.log("✅ MongoDB connected successfully");


      mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // stop the server if DB connection fails
  }
};

export default connectDB;
