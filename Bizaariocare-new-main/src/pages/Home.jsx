import React from 'react'
import Hero from '../components/Hero'
import Empowering from '../components/Empowering'
import MedicalBoard from '../components/medical-board/MedicalBoard'
import New from '../components/NewsAndArticles'
import InterCollabs from '../components/InterCollabs'
import SwiperSlider1 from '../components/others/SwiperSlider1'
import LiveSessions from '../components/LiveSessions'
import NewsAndArticles from '../components/NewsAndArticles'

import Awards from '../components/Awards'
import AwardsSlider from '../components/awards-certification/AwardsSlider'
import Testimonial from '../components/Testimonial'
import MedicalBoardPartnerHospitals from '../components/MedicalBoardPartnerHospitals'
import DoctorAppointmentTable from '../UI/DoctorAppointmentTable'
import Spacer from '../components/spacer'
import SpacerComp from '../components/spacer'
import BookingAppointment from '../UI/BookingAppointment'


const Home = () => {
  return (
      <>
          <Hero />
      <Empowering />
      <MedicalBoardPartnerHospitals/>
      {/* <MedicalBoard /> */}
      {/* Cardiology */}
      <InterCollabs />
      <LiveSessions/>
     
      <NewsAndArticles />
      <Awards />
      <Testimonial />
      {/* <SpacerComp/> */}
      {/* <DoctorAppointmentTable /> */}
      {/* <BookingAppointment/> */}
       {/* <New /> */}
      {/* <SwiperSlider1/> */}

      {/* <AwardsSlider/> */}
      </>
  )
}

export default Home