// admin.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.model");
const Product = require("./models/product.model"); // Assumed Product Model
const Booking = require("./models/booking.model"); // Assumed Booking Model
const User = require("./models/user.model"); // Assumed User Model

const router = express.Router();

// Middleware for Admin Authentication
const authAdmin = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    if (decoded.role !== "admin") {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send({ error: "Not authorized as admin" });
  }
};

// Admin Login
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    "your_secret_key",
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// Manage Products (Add, Edit, Delete)
router.post("/admin/products", authAdmin, async (req, res) => {
  const { name, price, description, stock } = req.body;
  const product = new Product({ name, price, description, stock });
  await product.save();
  res.json({ message: "Product added successfully" });
});

router.put("/admin/products/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json({ message: "Product updated successfully" });
});

router.delete("/admin/products/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: "Product deleted successfully" });
});

// Manage Product Bookings (View, Cancel)
router.get("/admin/bookings", authAdmin, async (req, res) => {
  const bookings = await Booking.find().populate("product").populate("user");
  res.json(bookings);
});

router.delete("/admin/bookings/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  await Booking.findByIdAndDelete(id);
  res.json({ message: "Booking canceled successfully" });
});

// Manage Users (Add, Edit, Delete)
router.post("/admin/users", authAdmin, async (req, res) => {
  const { username, password, role } = req.body;
  const user = new User({ username, password, role });
  await user.save();
  res.json({ message: "User added successfully" });
});

router.put("/admin/users/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User updated successfully" });
});

router.delete("/admin/users/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully" });
});

// Generate Reports (Product Booking and Sales)
router.get("/admin/reports/bookings", authAdmin, async (req, res) => {
  const bookingCount = await Booking.countDocuments();
  const sales = await Booking.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$amount" } } },
  ]);
  res.json({
    totalBookings: bookingCount,
    totalSales: sales[0]?.totalSales || 0,
  });
});

module.exports = router;
