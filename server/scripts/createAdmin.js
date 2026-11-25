const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../src/models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    }

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    const admin = await User.create({
      name: "TeamSpace Admin",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    console.log("Admin account created successfully!");
    console.log("Email:", admin.email);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
