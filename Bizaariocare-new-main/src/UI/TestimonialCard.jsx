import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../assets/css/testimonial.css";
import testmonial1 from '../assets/images/testmonial1.png'
import quote from '../assets/images/icons/quot.png'

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import {  FaCalendarAlt, FaLink } from "react-icons/fa";
// import { Pagination } from 'react-bootstrap';
// import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';

const TestimonialCard = () => {

 
const options = {
dots: true,
nav: true,
autoplay: false,
// mouseDrag: true,
smartSpeed: 1000,
// animateOut: "fadeOut",
loop: true,
// animateIn: 'flipInX',
items: 1,
margin:10,
// stagePadding:30, 
    responsive: { 
0: {
margin: 10,
            dots: true,
}, 
1200: { 
    margin: 10, 
}
    
    }
};

    return (
      <> 
           <section>
            <div className="container ">
                <div className="row">
                    <div className=" col-12 mb-5">
                        <h2 className='fw-semibold '>Patients Testimonials</h2>
                        <p className='light-color mb-0'>Learn from leading doctors and specialists through focused, digestible video content.</p>
                        </div> 
                        <OwlCarousel className="owl-theme " id='testmonital-card-owl' {...options}>
                            <div className="inner-testmonial">
                                <div className="col-lg-8 col-12 pb-3   ">
                                    <div className="test-card">
                                        <p className="testimonial-text">
                                            Dr. Stonehart is not only a great cardiologist but also a kind human
                                            being. He explained my condition clearly, eased my fears, and guided
                                            me through successful treatment.
                                        </p>
                                        <div className="testmonial-inner position-relative d-flex">
                                            <div>
                                                <h4 className="fw-bold mb-0">Sarah Thomas</h4>
                                                <small className="text-muted">Mumbai</small>
                                            </div>
                                            <div className="quote">
                                                <img src={quote} alt="" className="img-fluid" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-12">
                                             <div className="fix-user-img">
                                            <img src={testmonial1} alt="Testimonial "
                                                className="img-fluid testimonial-img" />
                                        </div> 
                                    </div>
                                </div>
                           
                            </div>
                            
                        </OwlCarousel>
                    
                </div>
            </div> 
        </section> 
      </> 
  );
};

export default TestimonialCard;
