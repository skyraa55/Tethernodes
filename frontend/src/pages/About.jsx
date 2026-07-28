import React from "react";
import Layout from "../components/Layout.jsx";
import PageBanner from "../components/PageBanner.jsx";
import CoreValues from "../components/sections/CoreValues.jsx";
import CommunityNetwork from "../components/sections/CommunityNetwork.jsx";

export default function About() {
  return (
    <Layout>
      <PageBanner
        eyebrow="About Tethernodes"
        title="Building the Foundation of the Decentralized Future"
        sub="A community driven ecosystem funding real blockchain innovation built on transparency, stability, and shared growth."
      />
      <CoreValues />
      <CommunityNetwork />
    </Layout>
  );
}
