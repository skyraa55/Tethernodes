// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import client from "../api/client";
// import { useAuth } from "../context/AuthContext";

// export default function VerifyOTP() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [email, setEmail] = useState(location.state?.email || "");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [info, setInfo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setInfo("");
//     setLoading(true);
//     try {
//       const res = await client.post("/auth/verify-otp", { email, otp });
//       login(res.data.token, res.data.user);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Verification failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleResend() {
//     setError("");
//     setInfo("");
//     setResending(true);
//     try {
//       const res = await client.post("/auth/resend-otp", { email });
//       setInfo(res.data.message);
//     } catch (err) {
//       setError(err.response?.data?.message || "Could not resend OTP.");
//     } finally {
//       setResending(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//         <h1 className="text-2xl font-semibold mb-1">Verify your email</h1>
//         <p className="text-slate-500 text-sm mb-6">
//           Enter the code sent to your email address to activate your account.
//         </p>

//         {error && (
//           <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//             {error}
//           </div>
//         )}
//         {info && (
//           <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//             {info}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Verification code</label>
//             <input
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               maxLength={6}
//               className="w-full rounded-lg border border-slate-300 px-3 py-2 tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
//               placeholder="000000"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-medium rounded-lg py-2.5 transition-colors"
//           >
//             {loading ? "Verifying..." : "Verify"}
//           </button>
//         </form>

//         <button
//           onClick={handleResend}
//           disabled={resending}
//           className="w-full text-sm text-brand-600 font-medium mt-4 hover:underline disabled:opacity-60"
//         >
//           {resending ? "Sending..." : "Resend code"}
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await client.post("/auth/verify-otp", { email, otp });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setInfo("");
    setResending(true);

    try {
      const res = await client.post("/auth/resend-otp", { email });
      setInfo(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-white">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)`,
        }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md bg-white rounded-[28px] p-8 sm:p-9"
        style={{
          border: "1px solid rgba(99,102,241,0.14)",
          boxShadow:
            "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.12)",
        }}
      >
        {/* Badge */}
        <span
          className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
          style={{
            color: INDIGO_SOLID,
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.18)",
          }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: INDIGO_SOLID }}
          />
          Verification
        </span>

        {/* Heading */}
        <h1 className="text-[26px] font-bold text-gray-950 mb-1.5 leading-snug">
          Verify your email
        </h1>

        <p className="text-gray-500 text-[13.5px] mb-6">
          Enter the code sent to your email address to activate your account.
        </p>

        {/* Error */}
        {error && (
          <div
            className="mb-5 text-[13px] font-medium rounded-xl px-4 py-3"
            style={{
              color: "#BE123C",
              background: "rgba(244,63,94,0.06)",
              border: "1px solid rgba(244,63,94,0.18)",
            }}
          >
            {error}
          </div>
        )}

        {/* Success */}
        {info && (
          <div
            className="mb-5 text-[13px] font-medium rounded-xl px-4 py-3"
            style={{
              color: "#166534",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.18)",
            }}
          >
            {info}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-[13px] font-semibold mb-1.5 text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-shadow"
              style={{
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 1px 2px rgba(15,23,42,0.03)",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 3px rgba(99,102,241,0.18)")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "0 1px 2px rgba(15,23,42,0.03)")
              }
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-[13px] font-semibold mb-1.5 text-gray-700">
              Verification code
            </label>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              placeholder="000000"
              className="w-full rounded-xl px-4 py-3 text-[22px] tracking-[0.45em] text-center font-semibold outline-none transition-shadow"
              style={{
                border: "1px solid rgba(99,102,241,0.18)",
                boxShadow: "0 1px 2px rgba(15,23,42,0.03)",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "0 0 0 3px rgba(99,102,241,0.18)")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "0 1px 2px rgba(15,23,42,0.03)")
              }
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold rounded-xl py-3.5 text-[14px] transition-transform duration-200 hover:-translate-y-[1px] disabled:opacity-60 disabled:hover:translate-y-0"
            style={{
              background:
                "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
              boxShadow: "0 8px 22px rgba(99,102,241,0.32)",
            }}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend */}
        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full mt-5 text-[13px] font-semibold transition-colors hover:underline disabled:opacity-60"
          style={{ color: INDIGO_SOLID }}
        >
          {resending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
}