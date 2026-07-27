import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Ecosystem from "./pages/Ecosystem.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Partners from "./pages/Partners.jsx";
import Faq from "./pages/Faq.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/ecosystem" element={<Ecosystem />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}
