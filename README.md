# Auth Boilerplate (Signup / Login / Email OTP / JWT)

A generic, reusable authentication starter kit — not tied to any specific product or platform.

- **backend/** — Node.js + Express + MongoDB API (bcrypt password hashing, hashed OTP codes, JWT sessions, rate limiting)
- **frontend/** — React + Vite + Tailwind CSS client (Signup → Verify OTP → Login → protected Dashboard)

## Quick start

1. **Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, and optionally SMTP creds
   npm run dev
   ```
   If you don't configure SMTP, OTP codes are printed to the backend console so you can still test the flow end-to-end.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```
   Visit `http://localhost:5173`.

See each folder's own README for more detail.

## What this is for
This is a learning/starter template demonstrating a common auth pattern (signup → email OTP verification → JWT-based login → protected routes) so you can adapt it into your own project. It is intentionally generic and not wired to any specific business logic — review and harden it (password reset, account lockout, logging, HTTPS, etc.) before using it for anything handling real user data in production.
