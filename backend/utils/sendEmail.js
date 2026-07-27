const nodemailer = require("nodemailer");

/**
 * Creates a reusable transporter using SMTP creds from .env.
 * For local testing without real SMTP creds, sign up for a free
 * Ethereal (https://ethereal.email) or Mailtrap account and drop
 * the credentials into .env - emails will be "sent" but not delivered
 * to real inboxes, which is perfect for development.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendEmail({ to, subject, html, text }) {
  // If SMTP creds aren't configured, don't attempt a real network connection
  // (it would fail/throw). Just log the OTP to console so the learning
  // example still works end-to-end without a real mail provider.
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("\n--- DEV MODE: no SMTP credentials configured ---");
    console.log(`Email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(text);
    console.log("-------------------------------------------------\n");
    return { devMode: true };
  }

  const transporter = createTransporter();

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });

  return info;
}

async function sendOTPEmail(to, otp) {
  return sendEmail({
    to,
    subject: "Your verification code",
    text: `Your verification code is ${otp}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.`,
    html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.</p>`,
  });
}

module.exports = { sendEmail, sendOTPEmail };