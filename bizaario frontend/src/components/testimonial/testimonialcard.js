import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/testimonial.css";
import testmonial1 from '../../assets/testmonial1.png'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  FaCalendarAlt, FaLink } from "react-icons/fa";
// import { Pagination } from 'react-bootstrap';
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';

const TestimonialCard = () => {
    return (
      <>
        <Swiper
        //         autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
            // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
                
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            //   onSlideChange={() =>{ }
        //        breakpoints={{
        //   769: {
        //     slidesPerView: 2,
        //     slidesPerGroup: 3,
        //   },
        // }}
            >
      

            
            <SwiperSlide>
                 <div className="inner-testmonial">
                     <div className="col-lg-8 col-12 pb-3   ">
                         <p className="mb-4 testimonial-text">
                             Dr. Stonehart is not only a great cardiologist but also a kind human
                             being. He explained my condition clearly, eased my fears, and guided
                             me through successful treatment.
                         </p>
                         <h4 className="fw-bold mb-0">Sarah Thomas</h4>
                         <small className="text-muted">Mumbai</small>
                         {/*
                         <FaQuoteLeft className="quote-icon text-muted" /> */}
                     </div>
                     <div className="fix-user-img">
                         <img src={testmonial1} alt="Testimonial " className="img-fluid testimonial-img" />
                     </div>
                 </div>
            </SwiperSlide> 
           
          
          </Swiper>
      </>
   
  );
};

export default TestimonialCard;
