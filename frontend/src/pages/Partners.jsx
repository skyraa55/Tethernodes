import React from "react";
import Layout from "../components/Layout.jsx";
import PageBanner from "../components/PageBanner.jsx";
import TechPartners from "../components/sections/TechPartners.jsx";

export default function Partners() {
  return (
    <Layout>
      <PageBanner
        eyebrow="Technology Partners"
        title="Building Alongside the Web3 Ecosystem"
        sub="Tethernodes is designed to integrate with the broader blockchain landscape — and to grow through the community that powers it."
      />
      <TechPartners />
    </Layout>
  );
}
