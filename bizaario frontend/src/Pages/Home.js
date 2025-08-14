import React from "react";
import HeroSection from "../components/HeroSection";
import EmpoweringDoctors from "../components/EmpoweringDoctors";
import StarDoctors from "../components/StarDoctors";
import Collaboration from "../components/Collaborations";
import LiveSessions from "../components/LiveSessions";
import NewsArticles from "../components/NewsArticles";
import AwardsCertificates from "../components/AwardsCertificates";
import PatientTestimonials from "../components/PatientTestimonials";
import Empowering from "../components/empowring";
import MedicalBoardPartnerHospitals from "../components/medicalboardpartnerhospital";
import CardiologyTabContent from "../medical-board/CardiologyTabContent";
import InterCollabs from "../components/intercollabs";
import Livesession from "../components/livesession";
import NewsAndArticles from "../components/newsarticals";
import Awards from "../components/awards";
import Testimonial from "../components/testimonial";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Home() {
  return (
    <div>
      <Navbar/>
     <HeroSection/>
      <Empowering/>
      <MedicalBoardPartnerHospitals/>
      <InterCollabs/>
      <Livesession/>
      <NewsAndArticles/>
      <Awards/>
      <Testimonial/>
      <Footer/>
    </div>
  );
}

export default Home;
