import "../assets/css/testimonial.css";
import testmonial1 from '../assets/images/testmonial1.png'
import quote from '../assets/images/icons/quot.png'
import OwlCarousel from "react-owl-carousel";
import { testmonialData } from "../Data/LocalData";


const TestimonialCard = () => {
 
    const options = {
        dots: true,
        smartSpeed: 1000,
        loop: true,
        items: 1,
        margin: 10,
    };

    return (
      <>
          <section>
              <div className="container ">
                  <div className="row">
                      <div className=" col-12 mb-5">
                          <h2 className='fw-semibold '>Patients Testimonials</h2>
                          <p className='light-color mb-0'>Learn from leading doctors and specialists through focused,
                              digestible video content.</p>
                      </div>

                      <OwlCarousel className="owl-theme " id='testmonital-card-owl' {...options}>
                          {testmonialData.map((item) => {
                          return (<div>
                              <div className="inner-testmonial" key={item.id}>
                                  <div className="col-lg-8 col-12 pb-3   ">
                                      <div className="test-card">
                                          <p className="testimonial-text">
                                              {item.review}
                                          </p>
                                          <div className="testmonial-inner position-relative d-flex">
                                              <div>
                                                  <h4 className="fw-bold mb-0"> {item.testmonialUser}</h4>
                                                  <small className="text-muted">{item.location }</small>
                                              </div>
                                              <div className="quote">
                                                  <img src={quote} alt="" className="img-fluid" />
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                                  {/* <div className="col-lg-4 col-12"> */}
                                      <div className="fix-user-img">

                                          <img src={testmonial1} alt="Testimonial "
                                              className="img-fluid testimonial-img" />
                                      </div>

                                  {/* </div> */}

                              </div>

                          </div>
                          )
                          })}
                      </OwlCarousel>

                  </div>
              </div>
          </section>
      </>
  );
};

export default TestimonialCard;
