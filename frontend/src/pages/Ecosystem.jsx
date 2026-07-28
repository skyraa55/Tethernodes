import React from "react";
import Layout from "../components/Layout.jsx";
import PageBanner from "../components/PageBanner.jsx";
import HowItWorks from "../components/sections/HowItWorks.jsx";
import KeyMetrics from "../components/sections/KeyMetrics.jsx";
import DrivingWeb3 from "../components/sections/DrivingWeb3.jsx";

export default function Ecosystem() {
  return (
    <Layout>
      <PageBanner
        eyebrow="The Ecosystem"
        title="Connecting Community Capital with Web3 Innovation"
        sub="A structured ecosystem designed around transparency and simplicity from joining, to supporting infrastructure, to network growth."
      />
      <HowItWorks />
      <KeyMetrics />
      <DrivingWeb3 />
    </Layout>
  );
}
