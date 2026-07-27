const crypto = require("crypto");

/**
 * Generates a numeric OTP of the given length (default 6 digits).
 */
function generateOTP(length = Number(process.env.OTP_LENGTH) || 6) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  return otp;
}

/**
 * Hashes an OTP with SHA-256 so the raw code is never stored in the DB.
 */
function hashOTP(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function getOTPExpiry() {
  const minutes = Number(process.env.OTP_EXPIRES_MINUTES) || 10;
  return new Date(Date.now() + minutes * 60 * 1000);
}

module.exports = { generateOTP, hashOTP, getOTPExpiry };
