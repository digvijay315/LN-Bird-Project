import React from 'react'
import { doctorArr, dominicArr } from '../Data/LocalData';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import locationIcon from "../assets/location-pin-alt-1-svgrepo-com 1.png"
import workIcon from "../assets/work.png"
const CardiologyTabContent = () => {
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
    <Slider className="owl-theme cardiology-owl" {...options}>
        {dominicArr.map((item) => {
        return (

            <div className="cardiology-card" key={item.id}>
                <img src={item.image} alt="doctor" className=" mx-auto" />
                <div className='d-flex justify-content-between pt-4'>
                    <div>
                        <h5 className="doc-name">{item.name}</h5>
                        <div className="exp" style={{fontSize:'12px'}}>{item.exp}</div>
                    </div>
                    <div className="profile-link">
                        <a href="#" style={{fontSize:'12px'}}>View Profile</a>
                    </div>
                </div>

                <div className="content mt-4">
                    <div className='d-flex pb-2 align-items-center'>
                        <div className='me-2'>
                            <img src={locationIcon} alt="icon" style={{width:'24px'}} />
                        </div>

                        <div style={{color:"#000000"}}>{item.location}</div>
                    </div>
                    <div className='d-flex'>
                        <div className='me-2'>
                            <img src={workIcon} alt="icon" style={{width:'24px'}} />
                        </div>

                        <div><strong style={{color:"#000000"}}>Specializes in: </strong><span
                                style={{color:'#73747e'}}>{item.Specializes}</span></div>
                    </div>
                </div>
                <div className="d-flex pt-3 " style={{gap:'20px'}}>
                    <div>
                        <a href="/" className="btn common-btn-dark  ">Book an Appointments</a>
                    </div>
                    <div>
                        <a href="/" className="btn  common-btn-outline ">Send Medical Query</a>
                    </div>
                </div>
            </div>
   
        )
        })}
    </Slider>
</>
)
}

export default CardiologyTabContent