import React from 'react'
import { Card } from "react-bootstrap";
import { FaMedal, FaCalendarAlt, FaLink } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./AwardCard.css";
import award from  '../assets/images/award.png'
import myprevimage from  '../assets/images/prev.png'
import mynextimage from  '../assets/images/next.png'
import crt2 from '../assets/images/icons/crt2.png'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


const Awards = () => {
const options = {
dots: false,
nav: true,
autoplay: false,
mouseDrag: true,
smartSpeed: 1000,
// animateOut: "fadeOut",
loop: true,
// animateIn: 'flipInX',
items: 1,
margin:10,
// stagePadding:30,
    navText: [`<img src=${myprevimage}>`, `<img src=${mynextimage}>`],
    responsive: {
        
0: {
        // items: 10,
        margin: 10,
            // dots: true,
    // nav: true,
},
600: {

    // stagePadding: 30,
    margin: 10,
    // dots: true,
},
1000: {

    // stagePadding: 60,
    margin: 10,
    // dots: true,
},
1200: { 
    margin:10,
}
    
    }
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
                  <OwlCarousel className="owl-theme " id='testmonital-owl' {...options}>
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
                                          <div className='d-flex mb-3 align-items-center'>
                                              <img src={crt2} alt="" style={{maxWidth:'25px', height:'auto'}} className='me-2' /> 
                                                <h2 className="fw-bold mb-1 ">
                                                Best Cardiologist 2022
                                                </h2>
                                          </div>
                                          
                                    <h4 className="text-muted mb-3 fw-semibold">Indian Medical Association</h4>
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
                    </OwlCarousel>

                  
              </div>
          </section>
      </>
  )
}

export default Awards