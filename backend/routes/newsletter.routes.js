const express = require("express");

const router = express.Router();
const Subscriber = require("../models/Subscriber");



// POST /api/newsletter -> subscribe a new email
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      // Not an error from the user's point of view — just tell them they're already in.
      return res.status(200).json({ success: true, message: "You're already subscribed." });
    }

    const subscriber = await Subscriber.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully.",
      data: subscriber,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: "You're already subscribed." });
    }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors });
    }
    console.error("Newsletter subscribe error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

// GET /api/newsletter -> list all subscribers (simple admin/read endpoint)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    console.error("Newsletter fetch error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch subscribers." });
  }
});

module.exports = router;