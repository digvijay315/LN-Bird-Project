import React from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { sliderArray } from '../Data/LocalData';

const Hero = () => {
// console.log(sliderArray);
const options = {
dots: true,
nav: false,
autoplay: false,
mouseDrag: false,
smartSpeed: 1000,
animateOut: "fadeOut",
loop: true,
// animateIn: 'flipInX',
items: 1,
margin:0,
// stagePadding:30,
// navText: [`<img src=${myprevimage}>` ,`<img src=${mynextimage}>`]
};
return (
<>
    <section className="hero-section"> 
        <OwlCarousel className="owl-theme " id='hero-slider' {...options}>
            {sliderArray.map((element)=> {
                return(
                    <div key={element.id}> 
                    <div className="item banner-bg "  style={element.sliderImage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <img src={element.sliderImage} alt="" />
                                <div className="hero-content">
                                    <h1 className="hero-title">{element.bannerTitle}</h1>
                                    <p className="hero-text">{element.dsc}</p>
                                    <div className="hero-btns ">
                                        <div>
                                            <a href="/" className="btn  nav-btn-style2  text-white">See How It  Works</a>
                                        </div>
                                        <div>
                                            <a href="/" className="btn  nav-btn-style">Join Our Network</a>
                                        </div> 
                                    </div>
                                    <div className="rounded-buttons mt-4 ">
                                        <div className="pill-button ">
                                            <strong>10,000+</strong> Hospitals connected
                                        </div>
                                        <div className="pill-button">
                                            <strong>10K+ </strong> doctors connected
                                        </div> 
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
            )
            }
            )}
        </OwlCarousel>
    </section>
</>
)
}

export default Hero