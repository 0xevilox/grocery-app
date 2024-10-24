// order.js
const express = require("express");
const Order = require("./models/order.model");
const Product = require("./models/product.model");
const auth = require("./middleware/auth"); // Assuming you have an authentication middleware
const router = express.Router();

// Place an Order
router.post("/orders", auth, async (req, res) => {
  const { products, deliveryAddress } = req.body;

  try {
    // Calculate the total amount based on product prices and quantities
    let totalAmount = 0;
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create new order
    const order = new Order({
      user: req.user._id, // Assuming the user is authenticated and stored in req.user
      products,
      totalAmount,
      deliveryAddress,
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// View All Orders (Admin)
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

// View My Orders (User)
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

// Update Order Status (Admin)
router.put("/orders/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();
    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
});

// Delete an Order (Admin or User)
router.delete("/orders/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only allow deletion if the user is the owner or an admin
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this order" });
    }

    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
