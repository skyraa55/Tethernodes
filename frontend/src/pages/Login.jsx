// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import client from "../api/client";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await client.post("/auth/login", form);
//       navigate("/verify-otp", { state: { email: form.email } });
//     } catch (err) {
//       if (err.response?.data?.requiresVerification) {
//         navigate("/verify-otp", { state: { email: form.email } });
//         return;
//       }
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
//         <h1 className="text-2xl font-semibold mb-1">Welcome back</h1>
//         <p className="text-slate-500 text-sm mb-6">Log in to your account.</p>

//         {error && (
//           <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               required
//               className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
//               placeholder="jane@example.com"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
//               placeholder="••••••••"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-medium rounded-lg py-2.5 transition-colors"
//           >
//             {loading ? "Logging in..." : "Log in"}
//           </button>
//         </form>

//         <p className="text-sm text-slate-500 mt-6 text-center">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-brand-600 font-medium hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }










import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

const INDIGO = "rgba(99,102,241,0.42)";
const SKY = "rgba(186,230,253,0.9)";
const INDIGO_SOLID = "rgba(99,102,241,1)";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await client.post("/auth/login", form);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      if (err.response?.data?.requiresVerification) {
        navigate("/verify-otp", { state: { email: form.email } });
        return;
      }
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-[160px] left-1/2 -translate-x-1/2 w-[680px] h-[400px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${SKY} 0%, ${INDIGO} 55%, transparent 75%)` }}
      />

      <div
        className="relative w-full max-w-md bg-white rounded-[28px] p-8 sm:p-9"
        style={{
          border: "1px solid rgba(99,102,241,0.14)",
          boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 24px 60px rgba(99,102,241,0.12)",
        }}
      >
        <span
          className="inline-flex items-center gap-[7px] text-[11px] font-semibold uppercase tracking-[.14em] rounded-full px-4 py-[6px] mb-5"
          style={{
            color: INDIGO_SOLID,
            background: "rgba(99,102,241,0.07)",
            border: "1px solid rgba(99,102,241,0.18)",
          }}
        >
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: INDIGO_SOLID }} />
          Account
        </span>

        <h1 className="text-[26px] font-bold text-gray-950 mb-1.5 leading-snug">
          Welcome back
        </h1>
        <p className="text-gray-500 text-[13.5px] mb-6">Log in to your account.</p>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-semibold mb-1.5 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-shadow"
              style={{ border: "1px solid rgba(99,102,241,0.18)", boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.18)")}
              onBlur={(e) => (e.target.style.boxShadow = "0 1px 2px rgba(15,23,42,0.03)")}
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold mb-1.5 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-3 text-[14px] outline-none transition-shadow"
              style={{ border: "1px solid rgba(99,102,241,0.18)", boxShadow: "0 1px 2px rgba(15,23,42,0.03)" }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.18)")}
              onBlur={(e) => (e.target.style.boxShadow = "0 1px 2px rgba(15,23,42,0.03)")}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold rounded-xl py-3.5 text-[14px] transition-transform duration-200 hover:-translate-y-[1px] disabled:opacity-60 disabled:hover:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #6366F1 0%, #38BFE3 100%)",
              boxShadow: "0 8px 22px rgba(99,102,241,0.32)",
            }}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-[13px] text-gray-500 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold hover:underline" style={{ color: INDIGO_SOLID }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}