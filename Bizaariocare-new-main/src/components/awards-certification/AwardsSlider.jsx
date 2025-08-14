// import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  FaCalendarAlt, FaLink } from "react-icons/fa";
// import { Pagination } from 'react-bootstrap';
import { A11y, Navigation, Scrollbar, Pagination, Autoplay} from 'swiper/modules';
// import { awardsCertfication } from '../../Data/LocalData';
import award from  '../../assets/images/award.png'
import crt2 from '../../assets/images/icons/crt2.png'
import { Card } from 'react-bootstrap';

const AwardsSlider = () => {
  return (
      <>
    <Swiper
        //         autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            // pagination={{ clickable: false }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            //   onSlideChange={() =>{ }
        //        breakpoints={{
        //   769: {
        //     slidesPerView: 2,
        //     slidesPerGroup: 3,
        //   },
        // }}
            >
      

                 {/* {awardsCertfication.map((element)=> {
                     return ( */}
                            <SwiperSlide>
                                 <Card className="award-card ">
                                    <div className="row"> 
                                        <div className="col-md-4 mb-md-0 mb-3">
                                            <img src={award} alt="Award Ceremony" className="img-fluid h-100 object-fit-cover" />
                                        </div> 
                                        <div className="col-md-8  d-flex align-items-center">
                                            <div className="right-content ">
                                                <h2 className="fw-semi-bold mb-1">
                                                    <img src={crt2} alt="" style={{maxWidth:'30px', height:'auto'}} /> Best
                                                    Cardiologist 2022
                                                </h2>
                                                <h4 className="text-muted mb-3">Indian Medical Association</h4>
                                                <p className="mb-3">
                                                    I has received multiple awards for excellence in cardiology and
                                                    patient care, including recognition for clinical innovation and
                                                    compassionate service. His work continues to be honored by leading
                                                    medical associations.
                                                </p>

                                                {/* Date */}
                                                <div className="crt-view-link d-flex align-items-center mb-2 text-muted">
                                                    <FaCalendarAlt className="me-2" style={{color:'#7f7f83'}} />
                                                    15/05/2022
                                                </div>

                                                {/* Certificate Link */}
                                                <FaLink className="me-2" size={20} style={{color:'#7f7f83'}} />
                                                <a href="#" className="  crt-view-link " style={{color:"#525FE1"}}>
                                                    View Certificate
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    </Card>
                            </SwiperSlide>
                            <SwiperSlide>
                                 <Card className="award-card ">
                                    <div className="row"> 
                                        <div className="col-md-4 mb-md-0 mb-3">
                                            <img src={award} alt="Award Ceremony" className="img-fluid h-100 object-fit-cover" />
                                        </div> 
                                        <div className="col-md-8  d-flex align-items-center">
                                            <div className="right-content ">
                                                <h2 className="fw-semi-bold mb-1">
                                                    <img src={crt2} alt="" style={{maxWidth:'30px', height:'auto'}} /> Best
                                                    Cardiologist 2022
                                                </h2>
                                                <h4 className="text-muted mb-3">Indian Medical Association</h4>
                                                <p className="mb-3">
                                                    I has received multiple awards for excellence in cardiology and
                                                    patient care, including recognition for clinical innovation and
                                                    compassionate service. His work continues to be honored by leading
                                                    medical associations.
                                                </p>

                                                {/* Date */}
                                                <div className="crt-view-link d-flex align-items-center mb-2 text-muted">
                                                    <FaCalendarAlt className="me-2" style={{color:'#7f7f83'}} />
                                                    15/05/2022
                                                </div>

                                                {/* Certificate Link */}
                                                <FaLink className="me-2" size={20} style={{color:'#7f7f83'}} />
                                                <a href="#" className="  crt-view-link " style={{color:"#525FE1"}}>
                                                    View Certificate
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    </Card>
                            </SwiperSlide>
                          {/* )
                          }
                          )} */}
          </Swiper>
          <div style={{height:'300px'}}></div>
      </>
  )
}

export default AwardsSlider