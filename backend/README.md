# Auth Boilerplate — Backend

Generic, reusable signup/login/OTP/JWT authentication API. Node.js + Express + MongoDB.

## Features
- Signup with name, email, password, phone
- Email OTP verification (6-digit code, hashed at rest, expires after N minutes)
- Login (blocked until email is verified)
- JWT issued on successful verification/login
- Protected route example (`GET /api/auth/me`)
- Rate limiting on auth endpoints
- Passwords hashed with bcrypt; OTPs hashed with SHA-256 (never stored in plaintext)

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` — point at your local or Atlas MongoDB instance
- `JWT_SECRET` — generate a long random string, e.g. `openssl rand -hex 32`
- `SMTP_*` — for local testing, create a free account at https://ethereal.email and paste the generated SMTP creds. If you leave `SMTP_USER` blank, the OTP is printed to the server console instead, so you can still test the full flow without real email.

Start MongoDB locally (or use Atlas), then:

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

## API Endpoints

| Method | Endpoint                 | Body                              | Notes                        |
|--------|--------------------------|------------------------------------|-------------------------------|
| POST   | `/api/auth/signup`       | `{ name, email, password, phone }` | Creates unverified user, sends OTP |
| POST   | `/api/auth/verify-otp`   | `{ email, otp }`                   | Verifies email, returns JWT   |
| POST   | `/api/auth/resend-otp`   | `{ email }`                        | Sends a new OTP                |
| POST   | `/api/auth/login`        | `{ email, password }`              | Returns JWT (must be verified) |
| GET    | `/api/auth/me`           | — (Bearer token header)            | Returns current user profile   |

## Notes for adapting this boilerplate
- Swap the email-only OTP for SMS (e.g. Twilio) if you also want phone verification — the `utils/otp.js` helper is transport-agnostic.
- Consider adding refresh tokens if you need longer-lived sessions with revocation.
- This is a learning/starter template, not a hardened production system — review things like password reset flows, account lockout policies, and audit logging before shipping to real users.
