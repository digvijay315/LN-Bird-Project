import React from "react";
import HeroSection from "../components/HeroSection";
import EmpoweringDoctors from "../components/EmpoweringDoctors";
import StarDoctors from "../components/StarDoctors";
import Collaboration from "../components/Collaborations";
import LiveSessions from "../components/LiveSessions";
import NewsArticles from "../components/NewsArticles";
import AwardsCertificates from "../components/AwardsCertificates";
import PatientTestimonials from "../components/PatientTestimonials";

function Home() {
  return (
    <div>
      <HeroSection />
      <EmpoweringDoctors />
      <StarDoctors />
      <Collaboration />
      <LiveSessions />
      <NewsArticles />
      <AwardsCertificates />
      <PatientTestimonials />
    </div>
  );
}

export default Home;
