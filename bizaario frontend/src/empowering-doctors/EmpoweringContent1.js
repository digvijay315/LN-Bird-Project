// import React from 'react'
import { doctorArr } from '../Data/LocalData';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EmpoweringContent1 = () => {
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
         <div className="doctor-slider mt-4">
                    <Slider className="owl-theme" {...options}>
                        {doctorArr.map((element) => {
                        return ( 
                        <div className=" bg-white" key={element.id} >
                                <img src={element.image} alt="doctor" className=" mx-auto" /> 
                                <div className="content mt-4">
                                      <p className="text-gray-700 text-start mb-1">
                                {element.dsc}
                                </p>
                                <p><strong>{element.name }</strong></p>
                                </div>
                          
                        </div>
                        )
                        })}
                    </Slider>
                </div>
      </>
  )
}

export default EmpoweringContent1