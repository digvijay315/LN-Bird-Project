import React from 'react'
import { Card } from "react-bootstrap";
import { FaMedal, FaCalendarAlt, FaLink } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./AwardCard.css";
import award from  '../assets/award.png'
import myprevimage from  '../assets/prev.png'
import mynextimage from  '../assets/next.png'
import crt2 from '../assets/crt2.png'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Awards = () => {
 const options = {
    dots: true, // matches your responsive dots config
    arrows: false, // nav: false
    infinite: true, // loop: true
    autoplay: false,
    speed: 2000, // smartSpeed equivalent
    centerMode: true, // center: true
    slidesToShow: 3, // default large screen
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
          dots: true
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerPadding: "15px",
          dots: true
        }
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          centerPadding: "10px",
          dots: true
        }
      }
    ]
  };

  return (
      <>
          <section className='spacing-top'>
              <div className="container">
                  <div className="row">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                              <h2 className="fw-semibold ">Awards & Certification</h2>
                              <p className="light-color lmb-0">Learn from leading doctors and specialists through
                                  focused, digestible video content.</p>
                          </div> 
                      </div> 
                  </div>
                  <Slider className="owl-theme " id='testmonital-owl' {...options}>
                        <div className="award-certfication">
                      <Card className="award-card ">
                        <div className="row ">
                            {/* Left Image */}
                            <div className="col-md-4 mb-md-0 mb-3">
                            <img
                                src={award}
                                alt="Award Ceremony"
                                className="img-fluid h-100 object-fit-cover"
                            />
                            </div>

                            {/* Right Content */}
                            <div className="col-md-8  d-flex align-items-center">
                                <div className="right-content ">
                                    <h2 className="fw-semi-bold mb-1">
                                    <img src={crt2} alt="" style={{maxWidth:'30px', height:'auto'}} /> Best Cardiologist 2022
                                    </h2>
                                    <h4 className="text-muted mb-3">Indian Medical Association</h4>
                                    <p className="mb-3">
                                        I has received multiple awards for excellence in cardiology and
                                        patient care, including recognition for clinical innovation and
                                        compassionate service. His work continues to be honored by leading
                                        medical associations.
                                    </p>

                                    {/* Date */}
                                    <div className= "crt-view-link d-flex align-items-center mb-2 text-muted">
                                        <FaCalendarAlt className="me-2"style={{color:'#7f7f83'}} />
                                        15/05/2022
                                    </div>

                                        {/* Certificate Link */}
                                        <FaLink className="me-2"  size={20} style={{color:'#7f7f83'}}/> 
                                    <a href="#" className="  crt-view-link " style={{color:"#525FE1"}}>
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        </div>
                        </Card>
                  </div>
                        <div className="award-certfication">
                      <Card className="award-card ">
                        <div className="row ">
                            {/* Left Image */}
                            <div className="col-md-4 mb-md-0 mb-3">
                            <img
                                src={award}
                                alt="Award Ceremony"
                                className="img-fluid h-100 object-fit-cover"
                            />
                            </div>

                            {/* Right Content */}
                            <div className="col-md-8  d-flex align-items-center">
                                <div className="right-content ">
                                    <h2 className="fw-semi-bold mb-1">
                                    <img src={crt2} alt="" style={{maxWidth:'30px', height:'auto'}} /> Best Cardiologist 2022
                                    </h2>
                                    <h4 className="text-muted mb-3">Indian Medical Association</h4>
                                    <p className="mb-3">
                                        I has received multiple awards for excellence in cardiology and
                                        patient care, including recognition for clinical innovation and
                                        compassionate service. His work continues to be honored by leading
                                        medical associations.
                                    </p>

                                    {/* Date */}
                                    <div className= "crt-view-link d-flex align-items-center mb-2 text-muted">
                                        <FaCalendarAlt className="me-2"style={{color:'#7f7f83'}} />
                                        15/05/2022
                                    </div>

                                        {/* Certificate Link */}
                                        <FaLink className="me-2"  size={20} style={{color:'#7f7f83'}}/> 
                                    <a href="#" className="  crt-view-link " style={{color:"#525FE1"}}>
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        </div>
                        </Card>
                  </div>
                    </Slider>

                  
              </div>
          </section>
      </>
  )
}

export default Awards