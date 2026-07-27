const express = require("express");
const rateLimit = require("express-rate-limit");
const { signup, login, resendOTP, verifyOTP, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many requests. Please try again later." },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many login attempts. Please try again later." },
});

router.post("/signup", otpLimiter, signup);
router.post("/login", loginLimiter, login);
router.post("/resend-otp", otpLimiter, resendOTP);
router.post("/verify-otp", otpLimiter, verifyOTP);
router.get("/me", protect, getMe);

module.exports = router;