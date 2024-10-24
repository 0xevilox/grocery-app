// index.js
const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51QCbs4H2qM00mOTftra5THUKosXg25Ym2wZQCp5p5IbKzH4iLIqWpB8aNJXcJuqsC23JZ9fSfaZRwxdw0f10VycX00L1IUYt5i"
); // Add your Stripe secret key here

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple home route
app.get("/", (req, res) => {
  res.send("Welcome to Stripe Payment Gateway");
});

// Payment route
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, paymentMethodType } = req.body;

    // Create a PaymentIntent with the specified amount, currency, and payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // In cents
      currency: currency,
      payment_method_types: [paymentMethodType], // Default is ['card']
    });

    res.json({
      clientSecret: paymentIntent.client_secret, // Send the client secret to the front-end to complete the payment
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listen on port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
