import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../src/models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await Admin.findOne({
      email: "admin@gmail.com"
    });

    if (adminExists) {
      console.log("❌ Admin already exists");
      process.exit();
    }

    await Admin.create({
      email: "admin@gmail.com",
      password: "Admin@123"
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
