import React, { useState } from 'react';
import CardiologyTabContent from '../CardiologyTabContent';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import { Pagination } from 'react-bootstrap';
import { A11y, Navigation, Scrollbar, Pagination, } from 'swiper/modules';

const MedicalBoard = () => {
const [activeTab, setActiveTab] = useState('tab1');

const renderContent = () => {
switch (activeTab) {
case 'tab1': return <div><CardiologyTabContent /></div>;
case 'tab2': return  <div>  <CardiologyTabContent /> </div>;
case 'tab3': return <div>  <CardiologyTabContent /> </div>;
case 'tab4': return <div>  <CardiologyTabContent /> </div>;
case 'tab5': return <div>  <CardiologyTabContent /> </div>;
case 'tab6': return <div>  <CardiologyTabContent /> </div>;
case 'tab7': return <div>  <CardiologyTabContent /> </div>;
return null;
}
};

return (
<>
  <section className=''>
    <div className="container ">
      <div className="row"> 
          <div className=" medical-tab-buttons mb-4">  
            <button className={`cutom-tab-style ${activeTab==='tab1' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab1')}>
            Cardiology
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab2' ? ' activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab2')}
            >
            Orthopedics
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab3' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab3')}
            >
            Pediatrics
          </button> 
          <button className={`cutom-tab-style ${activeTab==='tab4' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab4')}
            >
            Neurology
            </button>
             <button className={` cutom-tab-style ${activeTab==='tab5' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab5')}
            >
            Obstetrics & Gynecology
          </button>
          <button className={` cutom-tab-style ${activeTab==='tab7' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab7')}
            >
            Plastic & Reconstructive Surgery
          </button> 
          <button className={` cutom-tab-style ${activeTab==='tab6' ? 'activeTab' : 'gray-btn-style' }`} onClick={()=>
            setActiveTab('tab6')}
            >
            Otorhinolaryngology
          </button> 
        </div>  
        <div style={{padding:0}}>{renderContent()}</div>
      </div>
    </div>
  </section>
</>
);
};

export default MedicalBoard;