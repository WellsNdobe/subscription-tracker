import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
