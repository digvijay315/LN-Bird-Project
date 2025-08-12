import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
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
import Admindashboard from "./components/Admin/admindashboard";
import AdminAddDoctorHospital from '../src/components/Admin/adddoctor'
import Doctordashboard from "./components/Doctor/doctordashboard";
import Createnewcourse from "./components/Doctor/createnewcourse";
import Createdigitalcme from "./components/Doctor/createdigitalcme";

function App() {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/hospital-partners" element={<HospitalPartners />} />
        <Route path="/medical-board" element={<MedicalBoard />} />
        <Route path="/news-articles" element={<NewsArticlesPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignIn />} />
         <Route path="/admindashboard" element={<Admindashboard/>}></Route>
        <Route path="/adddoctor" element={<AdminAddDoctorHospital/>}></Route>
        <Route path="/doctordashboard" element={<Doctordashboard/>}></Route>
        <Route path="/createnewcourse" element={<Createnewcourse/>}></Route>
        <Route path="/createdigitalcme" element={<Createdigitalcme/>}></Route>
      </Routes>
      {/* <Doctordashboard/> */}
        
    </BrowserRouter>

   
  );
}

export default App;
