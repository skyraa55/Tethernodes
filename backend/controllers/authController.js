const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");
const { generateOTP, hashOTP, getOTPExpiry } = require("../utils/otp");
const { sendOTPEmail } = require("../utils/sendEmail");

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

async function signup(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Name, email, password, and phone are all required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const otp = generateOTP();

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      otpHash: hashOTP(otp),
      otpExpiresAt: getOTPExpiry(),
      otpAttempts: 0,
    });

    await sendOTPEmail(user.email, otp);

    return res.status(201).json({
      message: "Account created. Please check your email for the verification code.",
      userId: user._id,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Something went wrong during signup" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Password correct - now send an OTP to complete login
    const otp = generateOTP();
    user.otpHash = hashOTP(otp);
    user.otpExpiresAt = getOTPExpiry();
    user.otpAttempts = 0;
    await user.save();

    await sendOTPEmail(user.email, otp);

    return res.status(200).json({
      message: "Password correct. A verification code has been sent to your email.",
      requiresOTP: true,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong during login" });
  }
}

async function resendOTP(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    const otp = generateOTP();
    user.otpHash = hashOTP(otp);
    user.otpExpiresAt = getOTPExpiry();
    user.otpAttempts = 0;
    await user.save();

    await sendOTPEmail(user.email, otp);

    return res.status(200).json({ message: "A new verification code has been sent to your email" });
  } catch (err) {
    console.error("Resend OTP error:", err);
    return res.status(500).json({ message: "Something went wrong while resending the OTP" });
  }
}

async function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+otpHash +otpExpiresAt +otpAttempts"
    );

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    if (!user.otpHash || !user.otpExpiresAt) {
      return res.status(400).json({ message: "No active code found. Please request a new one" });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: "Code has expired. Please request a new one" });
    }

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many incorrect attempts. Please request a new code" });
    }

    if (hashOTP(otp) !== user.otpHash) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({ message: "Incorrect code" });
    }

    user.isEmailVerified = true;
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = signToken(user._id);

    return res.status(200).json({
      message: "Verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ message: "Something went wrong during verification" });
  }
}

async function getMe(req, res) {
  return res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      isEmailVerified: req.user.isEmailVerified,
      createdAt: req.user.createdAt,
    },
  });
}

module.exports = { signup, login, resendOTP, verifyOTP, getMe };