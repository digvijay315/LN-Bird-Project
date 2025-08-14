// import React from 'react'
import { doctorArr } from '../../Data/LocalData';
import OwlCarousel from "react-owl-carousel";

const EmpoweringContent1 = () => {
    const options = {
dots: false,
nav: false,
autoplay: false,
mouseDrag: true,
smartSpeed: 2000,
// animateOut: "fadeOut",
loop: true,
// animateIn: 'flipInX',
    // items: 4,
center: true,


responsive: {
0: {
        items: 1,
        margin: 10,
    dots: true,
},
600: {
    items: 1,
    // stagePadding: 30,
    margin: 15,
    dots: true,
},
1000: {
    items: 2,
    // stagePadding: 60,
    margin: 20,
    dots: true,
},
1200: {
    items: 3,
    stagePadding: 30,
    margin:30,
}
}

};
  return (
      <>
         <div className="doctor-slider mt-4">
                    <OwlCarousel className="owl-theme" {...options}>
                        {doctorArr.map((element) => {
                        return ( 
                        <div className=" bg-white" key={element.id} >
                                <img src={element.image} alt="doctor" className=" mx-auto" /> 
                                <div className="content mt-4">
                                      <p className="text-gray-700 text-start mb-1">
                                {element.dsc}
                                </p>
                                <p className=''><strong>{element.name }</strong></p>
                                </div>
                          
                        </div>
                        )
                        })}
                    </OwlCarousel>
                </div>
      </>
  )
}

export default EmpoweringContent1