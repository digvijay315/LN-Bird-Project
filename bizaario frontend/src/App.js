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
import Createdititalcmequestionbank from "./components/Doctor/createdigitalcmequestionbank";
import HeroSection from "./components/HeroSection";
import Empowering from "./components/empowring";
import MedicalBoardPartnerHospitals from "./components/medicalboardpartnerhospital";
import CardiologyTabContent from "./medical-board/CardiologyTabContent";
import InterCollabs from "./components/intercollabs";
import LiveSessions from "./components/LiveSessions";
import Livesession from "./components/livesession";
import NewsAndArticles from "./components/newsarticals";
import Awards from "./components/awards";
import Testimonial from "./components/testimonial";
import Createsubadmin from "./components/Doctor/createsubadmin";
import { Editdoctorprofile } from "./components/Doctor/editprofile";

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
        <Route path="/createdigitalcmequestionbank" element={<Createdititalcmequestionbank/>}></Route> 
        <Route path="/createsubadmin" element={<Createsubadmin/>}></Route> 
        <Route path="/editdoctorprofile" element={<Editdoctorprofile/>}></Route> 
      </Routes>
      {/* <Doctordashboard/> */}
      
        
    </BrowserRouter>

   
  );
}

export default App;
