import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import HospitalPartners from "./Pages/HospitalPartners";
import MedicalBoard from "./Pages/MedicalBoard";
import NewsArticlesPage from "./Pages/Articles";
import ContactUs from "./Pages/ContactUs";
import RegisterPage from "./components/register";
import SignIn from "./components/signin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/hospital-partners" element={<HospitalPartners />} />
        <Route path="/medical-board" element={<MedicalBoard />} />
        <Route path="/news-articles" element={<NewsArticlesPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
