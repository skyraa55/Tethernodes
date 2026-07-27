import React from "react";
import Layout from "../components/Layout.jsx";
import PageBanner from "../components/PageBanner.jsx";
import FaqSection from "../components/sections/Faq.jsx";
import Newsletter from "../components/sections/Newsletter.jsx";
import Cta from "../components/sections/Cta.jsx";

export default function Faq() {
  return (
    <Layout>
      <PageBanner
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        sub="Everything you need to know before joining the ecosystem."
      />
      <FaqSection />
      <Newsletter />
      <Cta />
    </Layout>
  );
}
