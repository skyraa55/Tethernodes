import React from "react";
import Layout from "../components/Layout.jsx";
import PageBanner from "../components/PageBanner.jsx";
import RoadmapSection from "../components/sections/Roadmap.jsx";
import TrustBand from "../components/sections/TrustBand.jsx";

export default function Roadmap() {
  return (
    <Layout>
      <PageBanner
        eyebrow="Roadmap"
        title="Building the Future, One Milestone at a Time"
        sub="From foundation to global ecosystem growth here's how we're getting there, and why the timing matters."
      />
      <RoadmapSection />
      <TrustBand />
    </Layout>
  );
}
