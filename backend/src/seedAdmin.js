import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDb from "./config/db.js";
import Admin from "./models/Admin.js";

const seedAdmin = async () => {
  try {
    await connectDb();

    // Clear existing admin to prevent "already exists" errors
    await Admin.deleteOne({ email: "admin@marque.com" });

    // Use the password provided by the user
    // The Admin model's pre("save") hook handles hashing automatically
    await Admin.create({
      email: "admin@marque.com",
      password: "Di6]$6e5"
    });

    console.log("Admin Created Successfully ✅");
    console.log("Email: admin@marque.com");
    console.log("Password: Di6]$6e5");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();